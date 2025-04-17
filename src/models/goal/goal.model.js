const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const User = require('../auth/user.model');
const GoalCategory = require('./goalCategory.model');

const Goal = sequelize.define('Goal',{
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    goalCategoryId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    dueDate:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    order:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    priority:{
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        allowNull: true,
    },
    state:{
        type: DataTypes.ENUM('nueva','en proceso', 'completada', 'cancelada'),
        allowNull: true,
        defaultValue: 'nueva',
    },
    progress:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    objective:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
    unit:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true,
    }
})
module.exports = Goal;

