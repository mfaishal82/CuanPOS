if(process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config();
}
const express = require ('express');
const app = express();
const port = process.env.PORT || 3838;
const cors = require('cors');
const router = require('./routes');
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`)
})
