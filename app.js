const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()

if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 使用 dotenv
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('一切順利')
})

app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})