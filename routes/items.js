const router = require('express').Router()
const db = require('../db/database')
const selectColumnsFrom = require('../queries/selectColumnsFrom')
const insertInto = require('../queries/insertInto')
const selectColumnsFromWhereLike = require('../queries/selectColumnsFromWhereLike')
const deleteFromWhereIdEquals = require('../queries/deleteFromWhereIdEquals')

router.get('/', (req, res) => {
  let query = selectColumnsFrom(['rowid', '*'], 'item')
  
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      let itemsModel = []

      for (let i = 0; i < rows.length; i++) {
        itemsModel.push({
          id: rows[i].rowid,
          name: rows[i].name,
          category: rows[i].category,
          status: rows[i].status,
          manufacturer: rows[i].manufacturer,
          location: rows[i].location
        })
      }

      res.send(itemsModel)
    }
  })
})

router.post('/', (req, res) => {
  let query = insertInto('item', [
    req.body.name,
    req.body.category,
    req.body.status,
    req.body.manufacturer,
    req.body.location
  ])

  db.run(query, function(err) {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      res.send(`${this.lastID}`)
    }
  })
})

router.get('/:filter', (req, res) => {
  let query = selectColumnsFromWhereLike(['rowid', '*'], 'item', 'name', req.params.filter)
  
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      let itemsModel = []

      for (let i = 0; i < rows.length; i++) {
        itemsModel.push({
          id: rows[i].rowid,
          name: rows[i].name,
          category: rows[i].category,
          status: rows[i].status,
          manufacturer: rows[i].manufacturer,
          location: rows[i].location
        })
      }
      
      res.send(itemsModel)
    }
  })
})

router.delete('/:id', (req, res) => {
  let query = deleteFromWhereIdEquals('item', req.params.id)

  db.run(query, (err) => {
    if (err) {
      console.error(err.message)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  });
})

module.exports = router
