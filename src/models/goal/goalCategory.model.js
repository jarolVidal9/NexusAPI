const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');


const GoalCategory = sequelize.define('GoalCategory',{
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    order:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

module.exports = GoalCategory;