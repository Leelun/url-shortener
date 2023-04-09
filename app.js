const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const UrlShortener = require('./models/shortener')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))


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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')







app.get('/', (req, res) => {
  res.render('index')
  
})

app.post('/toShorten', (req, res) => {
  const urlInput = req.body.urlInput

  function getRandomLetter() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseLetters = lowerCaseLetters.toUpperCase()
    const numberLetters = '0123456789'
    const randomSelection = lowerCaseLetters + uppercaseLetters + numberLetters
    const randomLetters = Math.floor(Math.random() * randomSelection.length)
    const output = randomSelection[randomLetters]
    return output
  }
  function getRandomUrlOutput() {
    let randomLetterOutput = ''
    for (let i = 1; i <= 5; i++) {
      randomLetterOutput += getRandomLetter()
    }
    return output = randomLetterOutput
  }

  let randomUrlOutput = getRandomUrlOutput()
  
  const urlOutput = `localhost:${port}/ShortenDone/${randomUrlOutput}`



  res.render('output', { urlOutput }) // 先渲染output畫面再去建資料庫

  


  UrlShortener.create({ urlInput, urlOutput })
  .catch(error => console.log(error))

})

app.get('/ShortenDone/:shorten', (req, res) => {
  const shorten = req.params.shorten
  UrlShortener.findOne({ urlOutput: `localhost:${port}/ShortenDone/${shorten}` })
  .lean()
  .then((shortenURL) => res.redirect(shortenURL.urlInput))
  .catch(() => { res.sendStatus(404) }) 
})
  




app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})