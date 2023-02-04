const express = require("express");
const { getAll, getById, addNew, removeById, updateById, updateFavStatus } = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const auth = require("../../middlewares/authenticate");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schema, schemaStatus } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, controllerWrapper(getAll));
router.get("/:contactId", auth, controllerWrapper(getById));
router.post("/", auth, validateBody(schema), controllerWrapper(addNew));
router.delete("/:contactId", auth, controllerWrapper(removeById));
router.put("/:contactId", auth, validateBody(schema), controllerWrapper(updateById));
router.patch("/:contactId/favorite", auth, validateBody(schemaStatus), controllerWrapper(updateFavStatus));

module.exports = router;
