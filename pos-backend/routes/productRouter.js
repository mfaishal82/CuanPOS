const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProductById,
  addProductWithInitialPurchase,
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/list", getProducts);
router.post("/add", upload.single("image"), createProduct);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), editProduct);
router.delete("/:id", upload.single("image"), deleteProductById);
router.post(
  "/add-with-initial-purchase",
  upload.single("image"),
  addProductWithInitialPurchase,
);

module.exports = router;
