const express = require('express');
const Authentication = require('../middlewares/authentication');
const router = express.Router();

router.use('/auth', require('./userRouter'))

router.use(Authentication)

router.get('/product')

module.exports = router;
