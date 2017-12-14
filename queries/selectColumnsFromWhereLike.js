const selectColumnsFromWhereLike = (tableColumns, tableName, filterColumn, filterText) => {
  let query = `SELECT {columns} FROM {tableName} WHERE {filterColumn} LIKE {filterText}`;
  let columns = '';

  for (let i = 0; i < tableColumns.length; i++) {
    if (i < tableColumns.length - 1) columns += tableColumns[i] + `,`;
    else columns += tableColumns[i];
  }

  filterText = `'%` + filterText + `%'`;
  
  query = query.replace('{tableName}', tableName);
  query = query.replace('{columns}', columns);
  query = query.replace('{filterColumn}', filterColumn);
  query = query.replace('{filterText}', filterText);

  return query; 
}

module.exports = selectColumnsFromWhereLike;
