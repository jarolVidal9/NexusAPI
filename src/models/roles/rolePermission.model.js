const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Role = require('./role.model');
const Permission = require('./permission.model');
const Resource = require('./resource.model');

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Role,
        //     key: 'id'
        // }
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Permission,
        //     key: 'id'
        // }
    },
    resourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Resource,
        //     key: 'id'
        // }
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['roleId', 'permissionId', 'resourceId']
        }
    ]
});
module.exports = RolePermission;
