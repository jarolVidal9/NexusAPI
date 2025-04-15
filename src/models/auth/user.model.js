const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Role = require('../roles/role.model');

const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATEONLY, // Cambiado a DATEONLY para solo año, mes, día
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('hombre', 'mujer', 'otro'),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
            if(user.changed('password')){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});
User.belongsTo(Role, {foreignKey: 'roleId'});

module.exports = User;