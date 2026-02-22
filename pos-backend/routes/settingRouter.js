const express = require("express");
const { getSetting, setting } = require("../controllers/settingController");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/get", getSetting);
router.post("/update", upload.single("logo"), setting);

module.exports = router;
