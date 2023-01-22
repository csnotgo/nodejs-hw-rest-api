const express = require("express");
const {
  getAll,
  getById,
  addNew,
  removeById,
  updateById,
} = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const controllerWrapper = require("../../helpers/controllerWrapper");
const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllerWrapper(getAll));
router.get("/:contactId", controllerWrapper(getById));
router.post("/", validateBody(schema), controllerWrapper(addNew));
router.delete("/:contactId", controllerWrapper(removeById));
router.put("/:contactId", validateBody(schema), controllerWrapper(updateById));

module.exports = router;
