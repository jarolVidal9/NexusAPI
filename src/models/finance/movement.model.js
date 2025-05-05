const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Movement = sequelize.define('Movement',{
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type: DataTypes.ENUM('ingreso', 'egreso'),
        allowNull: false,
    },
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
});

module.exports = Movement;