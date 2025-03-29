const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const Resource = require('../models/resource.model');


const getRoles = async (req, res, next) => {
    try{
        const roles = await Role.findAll();
        res.json(roles);
    }catch(err){
        next(err);
    }
}
const getRolesById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const role = await Role.findByPk(id, {
            include: {
            model: Permission,
            attributes: ['id', 'name'],
            include: {
                model: Resource,
                attributes: ['id', 'name']
            }
            },
            attributes: ['id', 'name']
        });

        const groupedPermissions = role.Permissions.reduce((acc, permission) => {
            const resourceName = permission.Resource.name;
            if (!acc[resourceName]) {
            acc[resourceName] = [];
            }
            acc[resourceName].push({
            id: permission.id,
            name: permission.name,
            RolePermission: permission.RolePermission
            });
            return acc;
        }, {});

        role.Permissions = groupedPermissions;
        res.json(role);
    }catch(err){
        next(err);
    }
}


const createRole = async (req, res, next) => {
    try{
        const { name } = req.body;
        const newRole = await Role.create({name});
        res.json(newRole);
    }catch(err){
        next(err);
    }
}

const updateRole = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const role = await Role.findByPk(id);
        role.name = name;
        await role.save();
        res.json(role);
    }catch(err){
        next(err);
    }
}

const deleteRole = async (req, res, next) => {
    try{
        const { id } = req.params;
        const role = await Role.findByPk(id);
        await role.destroy();
        res.json(role);
    }catch(err){
        next(err);
    }
}



module.exports = {
    getRoles,
    getRolesById,
    createRole,
    updateRole,
    deleteRole
}