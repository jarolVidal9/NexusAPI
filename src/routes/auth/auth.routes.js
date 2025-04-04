const express = require("express");
const router = express.Router();
const { login, refreshAccessToken,registerUser, profile, requestPasswordReset, passwordReset} = require("../../controllers/auth/auth.controller");
const { authMiddleware } = require("../../middlewares/auth/auth.middleware");
const { validateLogin } = require("../../validators/auth/auth.validator");

router.post("/register", registerUser);
router.post("/login",validateLogin, login);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", authMiddleware ,profile);
router.post("/reset-password", requestPasswordReset);
router.post("/reset-password/:token", passwordReset);


module.exports = router;