const express = require("express")
const { getProducts, createProduct, getProductById, editProduct, deleteProductById } = require("../controllers/productController")
const router = express.Router()
const multer = require('multer')
const upload = multer()

router.get("/list", getProducts)
router.post("/add", upload.single('image'), createProduct)
router.get("/:id", getProductById)
router.put("/:id", upload.single('image'), editProduct)
router.delete("/:id", upload.single('image'), deleteProductById)

module.exports = router
