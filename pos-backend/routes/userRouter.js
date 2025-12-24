const express = require('express');
const router = express.Router();
const { login, createUser, getUsers, editUserById, deleteUserById } = require("../controllers/userController");
const isAdmin = require('../middlewares/isAdmin');

router.post('/login', login)
router.use(isAdmin)
router.post('/register', createUser)
router.get('/list-users', getUsers)
router.put('/user/:id', editUserById)
router.delete('/user/:id', deleteUserById)

module.exports = router;
