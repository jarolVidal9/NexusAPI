const User = require('../models/auth/user.model');
const bcrypt = require('bcryptjs');


const getUser = async (req, res, next) => {
    console.log("getUser");
    
    try{

        const { id } = req.user;
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'resetToken', 'resetTokenExpiration', 'roleId']
            }
        });
        if (!user) {
            return res.status(404).json({
                errors: [{ msg: 'Usuario no encontrado' }]
            });
        }
        res.json(user);
    }catch(err){
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try{
        const { id } = req.user;
        const data = req.body;
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            return res.status(404).json({
                errors: [{ msg: 'Usuario no encontrado' }]
            });
        }
        console.log("data", req.body);
        
        await user.update(data);
        res.json(user);
    }catch(err){
        next(err)
    }
}
const updatePassword = async (req, res, next) => {
    try{
        const { id } = req.user;
        const { password, newPassword } = req.body;
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            return res.status(404).json({
                errors: [{ msg: 'Usuario no encontrado' }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Contraseña actual incorrecta' }]
            });
        }
        await user.update({ password: newPassword });
        res.json(user);
    }catch(err){
        next(err)
    }
}

module.exports ={
    getUser,
    updateUser,
    updatePassword
}