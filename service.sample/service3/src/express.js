const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
const unkown = require('./this-does-not-exist.js')
const express = require('express')
console.log({ unkown })

process.env.APP_PATH = `${__dirname}/`
const PUBLIC_DIR = `${process.env.APP_PATH}public`
const SERVER_PORT = 8080

const app = express()
app.disable('x-powered-by')
const server = http.createServer(app)
const router = express.Router()
app.use(router)
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


app.use((req, res, next) => {
  console.log(req.url)
  console.log(req.path)
  if (req.path.indexOf('.') === -1) {
    try {
      const filePath = `${PUBLIC_DIR + req.path}.html`
      fs.statSync(filePath)
      return res.end(fs.readFileSync(filePath))
    } catch (e) {
      console.log(e)
    }
  }
  return next()
})
app.use(express.static(PUBLIC_DIR))

app.get('/', (req, res) => {
  return res.end(fs.readFileSync('./index.html'))
})
app.get('*', (req, res) => {
  res.status(404)
  return res.end('not found')
})

server.listen(SERVER_PORT, () => {
  console.log('Listen to:', SERVER_PORT)
})

