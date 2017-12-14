const deleteFromWhereIdEquals = (tableName, rowId) => {
  let query = `DELETE FROM {tableName} WHERE rowid = {rowId}`;
  
  query = query.replace('{tableName}', tableName);
  query = query.replace('{rowId}', rowId);

  return query; 
}

module.exports = deleteFromWhereIdEquals;
