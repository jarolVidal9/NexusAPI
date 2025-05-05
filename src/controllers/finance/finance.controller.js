const Movement = require('../../models/finance/movement.model');
const { Op } = require('sequelize');
const sequelize = require('../../config/database');

const getStatistics = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;        
        const statistics = await Movement.findAll({
            where: {
                userId: req.user.id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: [
                'type',
                [sequelize.fn('SUM', sequelize.col('amount')), 'total']
            ],
            group: ['type'],
            raw: true 
        });        
        const totalIncome = statistics.find(stat => stat.type === 'ingreso')?.total || 0;
        const totalExpense = statistics.find(stat => stat.type === 'egreso')?.total || 0;
        const balance = totalIncome - totalExpense;
        const response = {
            totalIncome,
            totalExpense,
            balance
        };
        res.json(response);
    }catch (err) {
        next(err);
    }
}
const getMovements = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;        
        const movements = await Movement.findAll({
            where: {
                userId: req.user.id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json(movements);
    } catch (err) {
        next(err);
    }
}

const getMovement = async (req, res, next) => {
    try {
        const movement = await Movement.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        res.json(movement);
    } catch (err) {
        next(err);
    }
}

const createMovement = async (req, res, next) => {
    try {
        const { type, amount, date, title } = req.body;
        const movement = await Movement.create({
            userId: req.user.id,
            type,
            title,
            amount,
            date
        });
        res.status(201).json(movement);
    } catch (err) {
        next(err);
    }
}

const updateMovement = async (req, res, next) => {
    try {
        const { type, amount, date, title} = req.body;
        const movement = await Movement.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });
        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        await movement.update({
            type,
            amount,
            date,
            title
        });
        res.json(movement);
    } catch (err) {
        next(err);
    }
}

const deleteMovement = async (req, res, next) => {
    try {
        const movement = await Movement.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });
        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        await movement.destroy();
        res.json({ message: 'Movimiento eliminado' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getMovements,
    getMovement,
    createMovement,
    updateMovement,
    deleteMovement,
    getStatistics
}

