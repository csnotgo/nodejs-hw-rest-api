const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAll = async (req, res, _) => {
  const { id } = req.user;
  const { favorite } = req.query;

  const result = await Contact.find({ owner: id })
    .populate("owner", "email subscription")
    .sort(favorite ? { favorite: -1 } : {})
    .skip(2);
  res.json(result);
};

const getById = async (req, res, _) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ owner: id, _id: contactId }).populate("owner", "email subscription");
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const addNew = async (req, res, _) => {
  const { id } = req.user;
  const result = await Contact.create({ ...req.body, owner: id });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeById = async (req, res, _) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({ owner: id, _id: contactId });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, _) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ owner: id, _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const updateFavStatus = async (req, res, _) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ owner: id, _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll,
  getById,
  addNew,
  removeById,
  updateById,
  updateFavStatus,
};
