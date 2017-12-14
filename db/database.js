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
    let createTableQuery = createTable('item', [
      'name text',
      'category text',
      'status text',
      'manufacturer text',
      'location text'
    ])
    db.run(createTableQuery, (err) => {
      if (!err) {
        let insertQuery1 = insertInto('item', [
          'Big screen TV 1',
          'Tech',
          'Broken',
          'LG',
          '204'
        ])
        let insertQuery2 = insertInto('item', [
          'Big screen TV 2',
          'Tech',
          'Broken',
          'LG',
          '204'
        ])
        let insertQuery3 = insertInto('item', [
          'Big screen TV 3',
          'Tech',
          'Broken',
          'LG',
          '204'
        ])
        db.serialize(() => {
          db.run(insertQuery1)
          db.run(insertQuery2)
          db.run(insertQuery3)
          console.log('Item table not found. Created a new one with 3 items:');
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
  }
})

module.exports = db
