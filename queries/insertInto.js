const insertInto = (tableName, tableRowValues) => {
  let query = `INSERT INTO {tableName} VALUES ({values})`;
  let values = '';

  for (let i = 0; i < tableRowValues.length; i++) {
    if (i < tableRowValues.length - 1) values += `'` + tableRowValues[i] + `',`;
    else values += `'` + tableRowValues[i] + `'`;
  }
  
  query = query.replace('{tableName}', tableName);
  query = query.replace('{values}', values);

  return query; 
}

module.exports = insertInto;
