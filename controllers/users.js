const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { User } = require("../models/user");
const RequestError = require("../helpers/RequestError");

const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({ email: result.email, subscription: result.subscription, avatarUrl: result.avatarURL });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email: result.email, subscription: result.subscription } });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json();
};

const current = async (req, res) => {
  const { id } = req.user;

  const result = await User.findById(id);
  res.json({ email: result.email, subscription: result.subscription });
};

const subscription = async (req, res) => {
  const { id } = req.user;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ subscription: result.subscription });
};

const avatar = async (req, res) => {
  const { id } = req.user;

  const { path: uploadTmp, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${id}.${extention}`;

  const result = path.join(avatarDir, filename);
  await fs.rename(uploadTmp, result);

  Jimp.read(result, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(result);
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { register, login, logout, current, subscription, avatar };
