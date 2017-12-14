const sqlite3 = require('sqlite3')
const createTable = require('../queries/createTable')
const insertInto = require('../queries/insertInto')
const selectColumnsFrom = require('../queries/selectColumnsFrom')

// Create database connection
let db = new sqlite3.Database('./db/hotel.db', (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Connected to the hotel database.')
    
    // If item table does not exist, create one with 3 entries.
    // Otherwise leave as is
    db.serialize(() => {
      let createTableSql = createTable('item', [
        'name text',
        'category text',
        'status text',
        'manufacturer text',
        'location text'
      ])
      db.run(createTableSql, (err) => {
        if (!err) {
          let insertSql1 = insertInto('item', [
            'Big screen TV 1',
            'Tech',
            'Broken',
            'LG',
            '204'
          ])
          let insertSql2 = insertInto('item', [
            'Big screen TV 2',
            'Tech',
            'Broken',
            'LG',
            '204'
          ])
          let insertSql3 = insertInto('item', [
            'Big screen TV 3',
            'Tech',
            'Broken',
            'LG',
            '204'
          ])
          db.run(insertSql1)
          db.run(insertSql2)
          db.run(insertSql3)
        }
      })
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

module.exports = db
