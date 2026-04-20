const router = require("express").Router();
const {
  createQRIS,
  confirmPayment,
  pakasirWebhook,
} = require("../controllers/paymentController");

router.post("/create-qris", createQRIS);
router.post("/confirm-payment", confirmPayment);
router.post("/webhook/pakasir", pakasirWebhook);

module.exports = router;
