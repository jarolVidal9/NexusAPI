const Goal = require('../../models/goal/goal.model.js');

const getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.findAll({
            where: {
                userId: req.user.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json(goals);
    } catch (err) {
        next(err);
    }
}
const createGoal = async (req, res, next) => {
    try {
        const data = req.body;
        const goal = await Goal.create({
            ...data,
            userId: req.user.id
        });
        res.json(goal);
    } catch (err) {
        next(err);
    }
}
const updateGoal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!goal) {
            return res.status(404).json({
                errors: [{ msg: 'Meta no encontrada' }]
            });
        }
        await goal.update(req.body);
        res.json(goal);
    } catch (err) {
        next(err);
    }
}
const deleteGoal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!goal) {
            return res.status(404).json({
                errors: [{ msg: 'Meta no encontrada' }]
            });
        }
        await goal.destroy();
        res.json({ msg: 'Meta eliminada' });
    } catch (err) {
        next(err);
    }
}
const getGoalById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findOne({
            where: {
                id,
                userId: req.user.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!goal) {
            return res.status(404).json({
                errors: [{ msg: 'Meta no encontrada' }]
            });
        }
        res.json(goal);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    getGoalById
}