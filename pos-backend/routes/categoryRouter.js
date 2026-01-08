const express = require("express")
const { getCategories, createCategory, getCategoryById, editCategoryById, deleteCategoryById } = require("../controllers/categoryController")
const router = express.Router()

router.get('/list', getCategories)
router.post('/add', createCategory)
router.get('/:id', getCategoryById)
router.put('/:id', editCategoryById)
router.delete('/:id', deleteCategoryById)

module.exports = router
