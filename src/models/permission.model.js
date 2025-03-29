const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Resource = require('./resource.model');

const Permission = sequelize.define('Permission', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{ timestamps: true});

// Relación: Un permiso pertenece a un recurso
Permission.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(Permission, { foreignKey: 'resourceId' });


module.exports = Permission;