const  Permission = require('../models/permission.model');

const getPermissions = async (req, res, next) => {
    try{
        const permissions = await Permission.findAll();
        res.json(permissions);
    }catch(err){
        next(err);
    }
}
const getPermissionsById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const permission = await Permission.findByPk(id);
        res.json(permission);
    }catch(err){
        next(err);
    }
}
const createPermission = async (req, res, next) => {
    try{
        const { name } = req.body;
        const newPermission = await Permission.create({name});
        res.json(newPermission);
    }catch(err){
        next(err);
    }
}

const updatePermission = async (req, res, next) => {
    try{
        const { id } = req.params;
        const updatedData = req.body;
        const permission = await Permission.findByPk(id);
        Object.assign(permission, updatedData);
        await permission.save();
        res.json(permission);
    }catch(err){
        next(err);
    }
}

const deletePermission = async (req, res, next) => {
    try{
        const { id } = req.params;
        const permission = await Permission.findByPk(id);
        await permission.destroy();
        res.json(permission);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getPermissions,
    getPermissionsById,
    createPermission,
    updatePermission,
    deletePermission
}
