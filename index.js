const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const fetch = require('node-fetch')
const path = require('path')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})
app.get('/get', (req, res, next) => {
  if (!req.query.url) {
    res.end('未传递url参数')
    return
  }
  fetch(req.query.url).then(res => res.json()).then((json) => {
    if (req.query.cors) {
      res.set('Access-Control-Allow-Origin', req.query.cors)
    }
    res.json(json)
  })
});
app.post('/get', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
});
const server = app.listen(3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});
