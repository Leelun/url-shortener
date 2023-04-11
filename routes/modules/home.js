
const express = require('express')
const router = express.Router() 
const UrlShortener = require('../../models/shortener')
const getRandomUrlOutput = require('../../getRandomShortcode')
const port = 3000


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/toShorten', (req, res) => {
  const urlInput = req.body.urlInput
  let path = getRandomUrlOutput()
  const urlOutput = `localhost:${port}/ShortenDone/${path}`
  function check() { //使用遞迴函式檢查是否有重複的網址
    UrlShortener.exists({ urlOutput: `localhost:${port}/ShortenDone/${path}` })
      .then((result) => {
        if (result) { //如果有的話則重新產生一組path
          path = getRandomUrlOutput()
          check()
        } else { //沒有的話check是否輸入相同的網址
          UrlShortener.findOne({ urlInput })
            .then((data) => { 
              if (data) { //是的話則把已經縮短過的網址render出來
                res.render('output', { urlOutput: data.urlOutput }) 
              } else {//否的話則去建立一組新的urlInput和urlOutput
                UrlShortener.create({ urlInput, urlOutput })
                  .then(() => { 
                    res.render('output', { urlOutput })
                  })
                  .catch(error => console.log(error))
              }
            })
            .catch(error => console.log(error))
        }
      })
  }
  check();
})

router.get('/ShortenDone/:shorten', (req, res) => { //輸入短網址導向原本的網址
  const shorten = req.params.shorten
  UrlShortener.findOne({ urlOutput: `localhost:${port}/ShortenDone/${shorten}` })
    .lean()
    .then((shortenURL) => res.redirect(shortenURL.urlInput))
    .catch(() => { res.sendStatus(404) })
})


module.exports = router