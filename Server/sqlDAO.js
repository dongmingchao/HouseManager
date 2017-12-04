const encrypt = require('./encrypt');
const config = require('./config');
let connection = config.connection;

exports.login_check = function (thequery, resp) {
	console.log(thequery);
	connection.query('SELECT passwd FROM Users WHERE account = ?', [thequery.account], function (error, results, fields) {
		if (error) throw error;
		if (results.length === 0) {
			resp.end('NoThisGuy');
		} else {
			if (results[0].passwd !== thequery.passwd) {
				resp.end('PassWordNotCorrect');
			} else {
				connection.query('SELECT * FROM Users WHERE account = ?', [thequery.account], function (error, results) {
					resp.end(results[0].name);
				});
			}
		}
	});
};

exports.sign_up = function (thequery, resp) {
	let enc = [];
	enc[0] = thequery.account;
	enc[1] = thequery.passwd;
	console.log(encrypt.mix(enc));
	// connection.query('insert into User (email,pass) value (' + thequery.account + ',' + thequery.passwd + ')',function (error,results) {
	resp.end('success');
	// });
};

exports.create_table = function (tableName, columnName, columnType) {
	if (columnName instanceof Array)
		for (let eachName in columnName) {
			connection.query('create table if not exists ? ( ? varchar(50))', [tableName, columnName], (err, res) => {
				if (err) console.log(err.sqlMessage);
			});
		}
	else {//TODO::Error: SQL注入
		connection.query('create table if not exists' + connection.escapeId(tableName) + ' (' + connection.escapeId(columnName) + ' ' + columnType + ')DEFAULT CHARSET=utf8', (err, res) => {
			if (err) console.log(err.sqlMessage);
		});
	}
};

exports.delete_table = function (tableName) {
	connection.query('drop table '+connection.escapeId(tableName), (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
};
exports.update_item = function (tableName, field, value, rangeName, rangeValue) {
	if (field instanceof Array && value instanceof Array) {
		if (field.length === value.length)
			connection.query('UPDATE ? SET ?=? WHERE ?=?;', [tableName, field, value, rangeName, rangeValue], (err, res) => {
				if (err) console.log(err.sqlMessage);
			});
		else throw new Error('field.length != value.length , field.length = '+field.length+' while value.length = '+value.length);
	} else {
		connection.query('UPDATE ? SET ?=? WHERE ?=?;', [tableName, field, value, rangeName, rangeValue], (err, res) => {
			if (err) console.log(err.sqlMessage);
		});
	}
};
exports.insert_item = function (tableName,fields,values) {
	connection.query('INSERT INTO '+connection.escapeId(tableName)+' ( '+connection.escapeId(fields.toString())+' ) VALUES ( ? );', [values.toString()], (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
};
exports.select_item = function (tableName) {
	connection.query('drop table ?', [tableName], (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
};
exports.end = connection.end;