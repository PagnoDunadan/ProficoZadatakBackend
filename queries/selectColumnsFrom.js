const selectColumnsFrom = (tableColumns, tableName) => {
  let query = `SELECT {columns} FROM {tableName}`;
  let columns = '';

  for (let i = 0; i < tableColumns.length; i++) {
    if (i < tableColumns.length - 1) columns += tableColumns[i] + `,`;
    else columns += tableColumns[i];
  }
  
  query = query.replace('{tableName}', tableName);
  query = query.replace('{columns}', columns);

  return query; 
}

module.exports = selectColumnsFrom;
