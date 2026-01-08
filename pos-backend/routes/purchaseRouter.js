const express = require('express')
const { getAllPurchases, getPurchaseById, addPurchaseItem } = require('../controllers/purchaseController')
const router = express.Router()

router.get('/list', getAllPurchases)
router.get('/:id', getPurchaseById)
router.post('/add-item', addPurchaseItem)

module.exports = router
