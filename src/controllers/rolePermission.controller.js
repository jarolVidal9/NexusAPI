const RolePermission = require('../models/rolePermission.model');

// Get all resource permissions
const getAllRolePermissions = async (req, res, next) => {
    try {
        const permissions = await RolePermission.find();
        res.status(200).json(permissions);
    } catch (error) {
        next(error);
    }
};

// Get a single resource permission by ID
const getRolePermissionById = async (req, res, next) => {
    try {
        const permission = await RolePermission.findById(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(permission);
    } catch (error) {
        next(error);
    }
};

// Create a new resource permission
const createRolePermission = async (req, res, next) => {
    const permission = new RolePermission(req.body);
    try {
        const newPermission = await permission.save();
        res.status(201).json(newPermission);
    } catch (error) {
        next(error);
    }
};

// Update an existing resource permission
const updateRolePermission = async (req, res, next) => {
    try {
        const updatedPermission = await RolePermission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPermission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(updatedPermission);
    } catch (error) {
        next(error);
    }
};

// Delete a resource permission
const deleteRolePermission = async (req, res,next) => {
    try {
        const deletedPermission = await RolePermission.findByIdAndDelete(req.params.id);
        if (!deletedPermission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json({ message: 'Permission deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
}