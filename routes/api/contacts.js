const express = require("express");
const {
  getAll,
  getById,
  addNew,
  removeById,
  updateById,
  updateFavStatus,
} = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schema, schemaStatus } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(getAll));
router.get("/:contactId", controllerWrapper(getById));
router.post("/", validateBody(schema), controllerWrapper(addNew));
router.delete("/:contactId", controllerWrapper(removeById));
router.put("/:contactId", validateBody(schema), controllerWrapper(updateById));
router.patch(
  "/:contactId/favorite",
  validateBody(schemaStatus),
  controllerWrapper(updateFavStatus)
);

module.exports = router;
