const express = require('express')
const port = 3000
const app = express()


app.get('/', (req, res) => {
  res.send('一切順利')
})

app.listen(port, () => {
  console.log(`app is listen on http://localhost:${port}`)
})