const express = require('express');
const router = express.Router();
const { login, createUser, getUsers } = require("../controllers/userController");
const isAdmin = require('../middlewares/isAdmin');

router.post('/login', login)
router.use(isAdmin)
router.post('/register', createUser)
router.get('/list-users', getUsers)

module.exports = router;
