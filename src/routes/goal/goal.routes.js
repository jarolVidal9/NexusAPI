const express = require('express')
const router = express.Router()
const { getGoals, createGoal, updateGoal, deleteGoal, getGoalById } = require('../../controllers/goal/goal.controller')

router.get('/',getGoals)
router.post('/',createGoal)
router.put('/',updateGoal)
router.delete('/',deleteGoal)
router.get('/:id',getGoalById)

module.exports = router