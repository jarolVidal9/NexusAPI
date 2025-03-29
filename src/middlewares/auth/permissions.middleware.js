const Role = require('../../models/role.model');
const Permission = require('../../models/permission.model');

exports.hasPermission = async (req, res, next) => {
    try{
        if(!req.user){
            return res.status(401).json({message: 'No autorizado'});
        }
        const role = await Role.findByPk(req.user.user.roleId,
            {
                include: Permission,
                through: {attributes: []}
            });
        if(!role){
            return res.status(401).json({message: 'No autorizado'});
        }

        const hasPermission = role.Permissions.some(permission => permission.name === req.permission);
        if(!hasPermission){
            return res.status(401).json({message: 'No autorizado'});
        }
        next();
    }catch(err){
        next(err);
    }
}