const express = require('express') //載入express框架
const exphbs = require('express-handlebars') //載入樣板引擎handlebars
const bodyParser = require('body-parser') //載入body-parser套件
const routes = require('./routes') //引用路由器
const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
require('./config/mongoose') //與mongoose連線


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //樣板引擎相關設定
app.set('view engine', 'hbs')

app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})