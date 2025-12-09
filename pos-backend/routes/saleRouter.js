const express = require('express')
const { getAllSales, getSaleById, addSaleItem } = require('../controllers/saleController')
const router = express.Router()

router.get('/list', getAllSales)
router.get('/:id', getSaleById)
router.post('/add-item', addSaleItem)

module.exports = router
