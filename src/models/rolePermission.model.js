const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Role = require('./role.model');
const Permission = require('./permission.model');

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {timestamps: false});

Role.belongsToMany(Permission, {through: RolePermission, foreignKey: 'roleId'});
Permission.belongsToMany(Role, {through: RolePermission, foreignKey: 'permissionId'});


module.exports = RolePermission;
