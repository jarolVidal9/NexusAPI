const express = require("express");
const router = express.Router();
const { getPermissions, getPermissionsById, createPermission, updatePermission,deletePermission } = require("../../controllers/roles/permission.controller");

router.get("/", getPermissions );
router.get("/:id", getPermissionsById );
router.post("/", createPermission );
router.put("/:id", updatePermission );
router.delete("/:id", deletePermission );

module.exports = router;