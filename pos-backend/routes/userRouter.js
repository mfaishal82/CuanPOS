const express = require('express');
const router = express.Router();
const { login, createUser } = require("../controllers/userController");

router.post('/login', login)
router.post('/register', createUser)

module.exports = router;
