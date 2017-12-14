const express = require('express')
const sqlite3 = require('sqlite3')
var cors = require('cors')
const app = express()
var items = require('./routes/items')

app.use(cors())
app.use('/items', items);

const createTable = require('./queries/createTable')
const insertInto = require('./queries/insertInto')
const selectColumnsFrom = require('./queries/selectColumnsFrom')
const selectColumnsFromWhereLike = require('./queries/selectColumnsFromWhereLike')

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Connected to the hotel database.')
    db.serialize(() => {
      db.run(createTable('item', [
        'name text',
        'category text',
        'status text',
        'manufacturer text',
        'location text'
      ]))
      db.run(insertInto('item', [
        'Big screen TV 1',
        'Tech',
        'Broken',
        'LG',
        '204'
      ]))
      db.run(insertInto('item', [
        'Big screen TV 2',
        'Tech',
        'Broken',
        'LG',
        '204'
      ]))
      db.run(insertInto('item', [
        'Big screen TV 3',
        'Tech',
        'Broken',
        'LG',
        '204'
      ]))
      db.all(selectColumnsFrom(['rowid', '*'], 'item'), (err, rows) => {
        if (err) {
          throw err
        } else {
          console.log(rows)
        }
      })
    })
  }
})

// TODO: Prebacit se na router i maknit kod u drugi file
app.get('/', (req, res) => {
  let sql = selectColumnsFrom(['rowid', '*'], 'item')

  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(rows)
    }
  })
})

app.post('/', (req, res) => {
  // izvuci objekt iz req.body
  res.send('Post!')
})

app.get('/:filter', (req, res) => {
  let sql = selectColumnsFromWhereLike(['*'], 'item', 'name', req.params.filter)
  
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(rows)
    }
  })
})

app.delete('/', (req, res) => {
  res.send('Delete!')
})



// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Closed the database connection.');
//     }
// });

app.listen(3001, () => {
  console.log('API listening on port 3001!')
})
