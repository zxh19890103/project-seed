const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:9002'])
  res.json(require('./data.json'))
})

app.listen(3000, () => {
  console.log('mock server is running on port 3000')
})
