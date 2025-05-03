const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Note = sequelize.define('Note',{
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
    pinned:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    archived:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tags:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
})

module.exports = Note;