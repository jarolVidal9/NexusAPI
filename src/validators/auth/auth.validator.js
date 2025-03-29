const {body, validationResult} = require('express-validator');
const User = require('../../models/auth/user.model');

const validateUser = [
    body('name').notEmpty().withMessage('El nombre es requerido').bail()
        .isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email').notEmpty().withMessage('El email es requerido').bail()
        .isEmail().withMessage('El email no es válido').bail()
        .custom(async value => {
            const user = await User.findOne({where: {email: value}});
            if (user) { 
                return Promise.reject('El email ya está en uso');
            };
        }),
    body('password').notEmpty().withMessage('La contraseña es requerida').bail()
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

const validateLogin = [
    body('email').notEmpty().withMessage('El email es requerido').bail()
        .isEmail().withMessage('El email no es válido').bail()
        .custom(async value => {
            const user = await User.findOne({where: {email: value}});
            if (!user) {
                return Promise.reject('El email no está registrado');
            }
        }),
    body('password').notEmpty().withMessage('La contraseña es requerida').bail()
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateUser, validateLogin};