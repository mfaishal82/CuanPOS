const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Server is running normally 🚀')
})
router.use('/auth', require('./userRouter'))

module.exports = router;
