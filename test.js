const mysql = require('mysql');
const config = require('./Server/config.json');
let sql = require('./Server/sqlDAO');
sql.connect(mysql.createPool(config));
// console.log(sql);
// sql.create_table('testsc22', 'test', 'string');
//config.json中的"connectionLimit":2 影响同时流操作的数量
// sql.delete_table('test33').delete_table('test');
// sql.create_database('test').create_table('test33', 'test', 'int');
// sql.delete_database('test');
// sql.insert_item('anotest','test',666);
// sql.update_item('anotest','test',222);
// sql.select_item('anotest','test',1,1,console.log);
// sql.delete_item('anotest','test',222);

// TODO:sql.end();