const express = require("express");
const router = express.Router();
const { getAllRolePermissions,
        getRolePermissionById,
        createRolePermission,
        updateRolePermission,
        deleteRolePermission } = require("../controllers/rolePermission.controller");

router.get("/", getAllRolePermissions);
router.get("/:id", getRolePermissionById);
router.post("/", createRolePermission);
router.put("/:id", updateRolePermission);
router.delete("/:id", deleteRolePermission);

module.exports = router;