const express = require("express");
const { getSetting, setting } = require("../controllers/settingController");
const router = express.Router();

router.get("/get", getSetting);
router.post("/update", setting);

module.exports = router;
