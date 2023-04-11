
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
  function check() {
    UrlShortener.exists({ urlOutput: `localhost:${port}/ShortenDone/${path}` })
      .then((result) => {
        if (result) {
          path = getRandomUrlOutput()
          check()
        } else {
          UrlShortener.findOne({ urlInput })

            .then((data) => {
              if (data) {
                res.render('output', { urlOutput: data.urlOutput }) 
              } else {
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

router.get('/ShortenDone/:shorten', (req, res) => {
  const shorten = req.params.shorten
  UrlShortener.findOne({ urlOutput: `localhost:${port}/ShortenDone/${shorten}` })
    .lean()
    .then((shortenURL) => res.redirect(shortenURL.urlInput))
    .catch(() => { res.sendStatus(404) })
})


module.exports = router