const express = require('express')
const router = express.Router()
const { getMovements, createMovement, updateMovement, deleteMovement, getMovement, getStatistics } = require('../../controllers/finance/finance.controller')

router.get('/statistics', getStatistics)
router.get('/',getMovements)
router.post('/',createMovement)
router.put('/:id', updateMovement)
router.delete('/:id',deleteMovement)
router.get('/:id',getMovement)

module.exports = router