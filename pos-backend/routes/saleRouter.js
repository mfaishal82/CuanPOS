const express = require('express')
const { getAllSales, getSaleById, addSaleItem, getSalesSummary, getAllSaleItems } = require('../controllers/saleController')
const router = express.Router()

router.get('/list-sale', getAllSales)
router.get('/list-item', getAllSaleItems)
router.get('/summary', getSalesSummary)
router.get('/:id', getSaleById)
router.post('/add-item', addSaleItem)

module.exports = router
