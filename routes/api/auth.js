const express = require("express");
const {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
  verify,
  resendEmail,
} = require("../../controllers/users");
const validateBody = require("../../middlewares/validateBody");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schema, schemaSubscription, verifySchema } = require("../../models/user");
const auth = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", validateBody(schema), controllerWrapper(register));
router.get("/verify/:verificationToken", controllerWrapper(verify));
router.post("/verify", validateBody(verifySchema), controllerWrapper(resendEmail));
router.post("/login", validateBody(schema), controllerWrapper(login));
router.get("/logout", auth, controllerWrapper(logout));
router.get("/current", auth, controllerWrapper(current));
router.patch("/", auth, validateBody(schemaSubscription), controllerWrapper(subscription));
router.patch("/avatars", auth, upload.single("avatar"), controllerWrapper(avatar));

module.exports = router;
