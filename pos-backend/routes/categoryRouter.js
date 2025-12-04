const express = require("express")
const { getCategories } = require("../controllers/categoryController")
const router = express.Router()

router.get('/list', getCategories)
// router.post('/add')

module.exports = router
