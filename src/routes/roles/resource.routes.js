const express = require("express");
const router = express.Router();
const { getResources, getResourcesById, createResource, updateResource, deleteResource } = require("../../controllers/roles/resource.controller");

router.get("/", getResources);
router.get("/:id", getResourcesById );
router.post("/", createResource);
router.put("/:id", updateResource );
router.delete("/:id", deleteResource );

module.exports = router;