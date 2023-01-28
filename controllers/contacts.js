const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAll = async (_, res, __) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const addNew = async (req, res, _) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const updateFavStatus = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
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
