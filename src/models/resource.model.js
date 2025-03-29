const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Resource = sequelize.define('Resource', {
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


module.exports = Resource;