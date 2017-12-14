const router = require('express').Router()
const db = require('../db/database')
const selectColumnsFrom = require('../queries/selectColumnsFrom')
const selectColumnsFromWhereLike = require('../queries/selectColumnsFromWhereLike')

router.get('/', (req, res) => {
  let sql = selectColumnsFrom(['rowid', '*'], 'item')
  
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      res.send(rows)
    }
  })
})

router.post('/', (req, res) => {
    // izvuci objekt iz req.body
    res.send('Post!')
})

router.get('/:filter', (req, res) => {
  let sql = selectColumnsFromWhereLike(['*'], 'item', 'name', req.params.filter)
  
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      res.send(rows)
    }
  })
})

router.delete('/', (req, res) => {
    res.send('Delete!')
})

module.exports = router
