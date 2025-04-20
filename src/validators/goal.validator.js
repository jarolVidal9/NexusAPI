const {body, validationResult} = require('express-validator');

const validateGoal = [
    body('title').notEmpty().withMessage('El título es requerido').bail()
        .isLength({min: 3}).withMessage('El título debe tener al menos 3 caracteres'),
    body('goalCategoryId').notEmpty().withMessage('La categoría es requerida').bail()
        .isUUID().withMessage('La categoría debe ser un UUID válido').bail(),
    body('dueDate').notEmpty().withMessage('La fecha de vencimiento es requerida').bail(),
    body('priority').isIn(['baja', 'media', 'alta']).withMessage('La prioridad no es válida'),
    body('state').isIn(['pendiente', 'proceso', 'completada', 'cancelada', 'vencida']).withMessage('El estado no es válido'),
    body('progress')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (value === null || value === undefined || value === '') return true;
            if (isNaN(value)) {
                throw new Error('El progreso debe ser un número');
            }
            if (typeof req.body.goal !== 'undefined' && req.body.goal !== null && Number(value) > Number(req.body.goal)) {
                throw new Error('El progreso debe ser menor al objetivo');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateGoalUpdate = [
    body('title').optional().notEmpty().withMessage('El título es requerido').bail()
        .isLength({min: 3}).withMessage('El título debe tener al menos 3 caracteres'),
    body('goalCategoryId').optional().notEmpty().withMessage('La categoría es requerida').bail()
        .isUUID().withMessage('La categoría debe ser un UUID válido').bail(),
    body('dueDate').optional().notEmpty().withMessage('La fecha de vencimiento es requerida').bail(),
    body('priority').optional().isIn(['baja', 'media', 'alta']).withMessage('La prioridad no es válida'),
    body('state').optional().isIn([ 'proceso', 'completada', 'vencida']).withMessage('El estado no es válido'),
    body('progress')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (value === null || value === undefined || value === '') return true;
            if (isNaN(value)) {
                throw new Error('El progreso debe ser un número');
            }
            if (typeof req.body.objective !== 'undefined' && req.body.objective !== null && Number(value) > Number(req.body.objective)) {
                throw new Error('El progreso debe ser menor al objetivo');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]


module.exports = {
    validateGoal,
    validateGoalUpdate
}