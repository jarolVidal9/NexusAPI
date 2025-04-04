const Role = require('../../models/roles/role.model');
const Resource = require('../../models/roles/resource.model');
const RolePermission = require('../../models/roles/rolePermission.model');
const Permission = require('../../models/roles/permission.model');


const getRoles = async (req, res, next) => {
    try{
        const roles = await Role.findAll();
        res.json(roles);
    }catch(err){
        next(err);
    }
}
const getRolesById = async (req, res, next) => {
    try {
        const role = await Role.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Permission,
                    through: {
                        attributes: [] // No queremos datos extra de RolePermission
                    },
                    include: [
                        {
                            model: RolePermission,
                            include: [
                                {
                                    model: Resource,
                                    attributes: ['id', 'name'] // Solo queremos estos atributos de Resource
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!role) {
            return { message: 'Role not found' };
        }

        // Formatear la salida para agrupar los permisos por recurso
        const groupedPermissions = {};

        role.Permissions.forEach(permission => {
            permission.RolePermissions.forEach(rp => {
                const resource = rp.Resource;
                if (resource) {
                    if (!groupedPermissions[resource.name]) {
                        groupedPermissions[resource.name] = [];
                    }
                    groupedPermissions[resource.name].push(permission.name);
                }
            });
        });

        return {
            role: role.name,
            permissions: groupedPermissions
        };

    } catch (error) {
        console.error(error);
        return { message: 'Error retrieving role permissions' };
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