const express = require('express');
const router = express.Router();
const { login, createUser, getUsers, editUserById, deleteUserById, logout, getMe } = require("../controllers/userController");
const isAdmin = require('../middlewares/isAdmin');
const Authentication = require('../middlewares/authentication');

router.post('/login', login)
router.post('/logout', Authentication, logout)
router.get('/getme', Authentication, getMe)
router.use(isAdmin)
router.post('/register', createUser)
router.get('/list-users', getUsers)
router.put('/user/:id', editUserById)
router.delete('/user/:id', deleteUserById)

module.exports = router;
