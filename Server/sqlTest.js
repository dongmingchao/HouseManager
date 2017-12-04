const sql = require('./sqlDAO');
sql.create_table('anotest','test','int');
sql.insert_item('anotest','test',666);
sql.delete_table('anotest');
// sql.update_item('test','');
// process.exit();