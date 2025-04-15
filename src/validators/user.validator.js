const { body, validationResult } = require('express-validator');
const User = require('../models/auth/user.model');

const validateUserUpdate = [
    body('name').notEmpty().withMessage('El nombre es requerido').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email').notEmpty().withMessage('El email es requerido').bail()
        .isEmail().withMessage('El email no es válido').bail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value.toLowerCase() } });
            if (user && (!req.user || user.id !== req.user.id)) {
                return Promise.reject('El email ya está en uso');
            }
        }),
    body('username').optional().isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    body('phone').optional().isMobilePhone('any').withMessage('El número de teléfono no es válido'),
    body('birthday').optional().isISO8601().toDate().withMessage('La fecha de nacimiento no es válida'),
    body('gender').optional().isIn(['hombre', 'mujer', 'otro']).withMessage('El género debe ser hombre, mujer u otro'),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUserUpdate
};