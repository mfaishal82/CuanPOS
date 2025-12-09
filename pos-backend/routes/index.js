const express = require('express');
const Authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.use('/auth', require('./userRouter'))

router.use(Authentication)

// router.get('/getusers')
router.use('/product', require('./productRouter'))
router.use('/category', require('./categoryRouter'))
router.use('/purchase', require('./purchaseRouter'))
// router.get('/sale', require('./'))
router.use(errorHandler)

module.exports = router;
