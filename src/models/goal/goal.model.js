const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

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
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    order:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    priority:{
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        allowNull: false,
    },
    state:{
        type: DataTypes.ENUM('pendiente','proceso', 'completada', 'cancelada', 'vencida'),
        allowNull: true,
        defaultValue: 'pendiente',
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
    },
    
})
module.exports = Goal;

