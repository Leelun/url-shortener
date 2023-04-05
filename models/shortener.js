const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortener = new Schema({
  urlInput: {
    type: String,
    require: true
  }
})
module.exports = mongoose.model('UrlShortener', shortener)