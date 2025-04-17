const { Goal } = require('../../models');
const GoalCategory = require('../../models/goal/goalCategory.model');


const getCategoryWithGoals = async (req, res, next) => {
    try {
        const goalCategory = await GoalCategory.findAll({
            where: {
            userId: req.user.id
            },
            include: {
                model: Goal,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            },
            order: [['order', 'ASC']],
            attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId']
            }
        });
        res.json(goalCategory);
    } catch (err) {
        next(err);
    }
}

const createGoalCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const goalCategory = await GoalCategory.create({
            ...data,
            userId: req.user.id
        });
        res.json(goalCategory);
    } catch (err) {
        next(err);
    }
}

const deleteGoalCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const goalCategory = await GoalCategory.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!goalCategory) {
            return res.status(404).json({
                errors: [{ msg: 'Categoría de meta no encontrada' }]
            });
        }
        await goalCategory.destroy();
        res.json({ msg: 'Categoría de meta eliminada' });
    } catch (err) {
        next(err);
    }
}

const updateGoalCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const goalCategory = await GoalCategory.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!goalCategory) {
            return res.status(404).json({
                errors: [{ msg: 'Categoría de meta no encontrada' }]
            });
        }
        await goalCategory.update(req.body);
        res.json(goalCategory);
    } catch (err) {
        next(err);
    }
}
const reorderGoals = async (req, res, next) => {
    try{
        const goals = req.body;
        console.log('goals',req.body);
        
        const transaction = await GoalCategory.sequelize.transaction();
        try {
            for (const goal of goals) {
                await GoalCategory.update({ order: goal.order }, {
                    where: { id: goal.id },
                    transaction
                });
            }
            await transaction.commit();
            res.json({ msg: 'Orden de metas actualizado' });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }catch(err){
        next(err);
    }
}


module.exports = {
    createGoalCategory,
    deleteGoalCategory,
    updateGoalCategory,
    getCategoryWithGoals,
    reorderGoals
}