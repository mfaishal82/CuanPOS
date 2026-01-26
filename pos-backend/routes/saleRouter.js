const express = require('express')
const { getAllSales, getSaleById, addSaleItem, getSalesSummary, getAllSaleItems, getDailyAnalytics, getWeeklyAnalytics, getMonthlyAnalytics, getTopProductsAnalytics } = require('../controllers/saleController')
const router = express.Router()

router.get('/list-sale', getAllSales)
router.get('/list-item', getAllSaleItems)
router.get('/summary', getSalesSummary)
router.get('/analytics/daily', getDailyAnalytics)
router.get('/analytics/weekly', getWeeklyAnalytics)
router.get('/analytics/monthly', getMonthlyAnalytics)
router.get('/analytics/top-products', getTopProductsAnalytics)
router.get('/:id', getSaleById)
router.post('/add-item', addSaleItem)

module.exports = router
