const express = require('express')
const router = express.Router()
const { getGoals, createGoal, updateGoal, deleteGoal, getGoalById } = require('../../controllers/goal/goal.controller')
const { validateGoal, validateGoalUpdate} = require('../../validators/goal.validator')

router.get('/',getGoals)
router.post('/',validateGoal,createGoal)
router.put('/:id', validateGoalUpdate, updateGoal)
router.delete('/:id',deleteGoal)
router.get('/:id',getGoalById)


module.exports = router