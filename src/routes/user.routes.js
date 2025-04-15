const express = require("express");
const router = express.Router();
const { getUser, updateUser ,updatePassword } = require("../controllers/user.controller");
const { validateUserUpdate } = require("../validators/user.validator");

router.get("/",getUser);
router.put("/",validateUserUpdate,updateUser);
router.put("/update-password",updatePassword);

module.exports = router;