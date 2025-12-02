const express = require("express")
const { getProducts, createProduct, getProductById, editProduct, deleteProductById } = require("../controllers/productController")
const router = express.Router()

router.get("/list", getProducts)
router.post("/add", createProduct)
router.get("/:id", getProductById)
router.put("/:id", editProduct)
router.delete("/:id", deleteProductById)

module.exports = router
