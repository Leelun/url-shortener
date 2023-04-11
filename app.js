const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const routes = require('./routes')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)






mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')















app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})