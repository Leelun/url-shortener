const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortener = new Schema({
  urlInput: {
    type: String,
    require: true
  },
  urlOutput: {
    type: String
  }
})
module.exports = mongoose.model('UrlShortener', shortener)