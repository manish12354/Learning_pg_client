const create = function(tableName){
  let query = `CREATE TABLE ${tableName}`;
  return query;
}

// module.export = {
//   create
// };

exports.create = create;
