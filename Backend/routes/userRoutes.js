const express = require("express");
const entryRouter = require("./entryRoutes");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.use("/entries", entryRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);

router.patch("/my-account/update-main", userController.updateMainUserData);
router.patch("/my-account/update-pass", authController.updatePassword);

module.exports = router;
