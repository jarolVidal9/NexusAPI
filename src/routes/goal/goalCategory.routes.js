const express = require('express');
const router = express.Router();
const { getCategoryWithGoals, createGoalCategory, updateGoalCategory, deleteGoalCategory,reorderGoals } = require('../../controllers/goal/goalCategory.controller');

router.get('/', getCategoryWithGoals);
router.post('/', createGoalCategory);
router.put('/:id', updateGoalCategory);
router.delete('/:id', deleteGoalCategory);
router.post('/reorder',reorderGoals)

module.exports = router