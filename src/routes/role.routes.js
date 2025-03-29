const express = require("express");
const router = express.Router();
const { getRoles, getRolesById, createRole, updateRole, deleteRole } = require("../controllers/role.controller");

router.get("/", getRoles)
router.get("/:id", getRolesById);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;