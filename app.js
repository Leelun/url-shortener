const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})