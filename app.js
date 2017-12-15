const express = require('express')
const bodyParser = require('body-parser')
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager
const db = require('./db/database')
const cors = require('cors')
const items = require('./routes/items')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/items', items)

app.get('/', (req, res) => {
  res.send('Hotel database API!')
})

const server = app.listen(3001, () => {
  console.log('Hotel database API listening on port 3001!')
})

const shutdownManager = new GracefulShutdownManager(server)

process.on('SIGTERM', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Closed the database connection.')
      shutdownManager.terminate(() => {
        console.log('Server is gracefully terminated.')
      })
    }
  })
})

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Closed the database connection.')
      shutdownManager.terminate(() => {
        console.log('Server is gracefully terminated.')
      })
    }
  })
})
