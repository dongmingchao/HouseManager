const encrypt = require('./encrypt');
// const config = require('./config');
// let connection = config.connection;

//TODO: SQL:set global wait_timeout = 10 等待10秒后关闭连接

/**
 * @this {connect}
 */
let connect = function (conn) {
	this.connection = conn;
	this.query = function (sql, values, cb) {
		conn.query(sql, values, cb);
	};
	this.escapeId = conn.escapeId;
};

exports.connect = connect;

exports.login_check = function (thequery, resp) {
	console.log(thequery);
	this.query('SELECT passwd FROM Users WHERE account = ?', [thequery.account], function (error, results, fields) {
		if (error) throw error;
		if (results.length === 0) {
			resp.end('NoThisGuy');
		} else {
			if (results[0].passwd !== thequery.passwd) {
				resp.end('PassWordNotCorrect');
			} else {
				this.connection.query('SELECT * FROM Users WHERE account = ?', [thequery.account], function (error, results) {
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

/**
 * @param {String} name Name of what Database you want to deal with.
 * @returns {Object} this module exports
 */
exports.create_database = function (name) {
	this.connection.query('create database ' + this.connection.escapeId(name), (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
	return this;
};

/**
 * @param {String} name Name of what Database you want to deal with.
 * @returns {Object} this module exports
 */
exports.delete_database = function (name) {
	this.connection.query('DROP DATABASE ' + this.connection.escapeId(name), (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
	return this;
};


let allow_type = ['int','varchar'];

/**
 * @param {String} tableName Name of what table you want to deal with.
 * @param {String} columnName
 * @param {type} columnType
 * @returns {Object} this module exports
 */
exports.create_table = function (tableName, columnName, columnType) {
	if (!allow_type.includes(columnType)) {
		console.log("列类型不允许");
		return this;
	}
	if (columnName instanceof Array)
		for (let eachName in columnName) {
			this.query('create table if not exists ? ( ? varchar(50))', [tableName, columnName], (err, res) => {
				if (err) console.log(err.sqlMessage);
			});
		}
	else {
		this.query('create table if not exists' + this.escapeId(tableName) + ' (' + this.escapeId(columnName) + ' ' + columnType + ')DEFAULT CHARSET=utf8', (err, res) => {
			if (err) console.log(err.sqlMessage);
		});
	}
};

/**
 * @param {String} tableName Name of what Table you want to delete.
 * @returns {Object} this module exports
 */
exports.delete_table = function (tableName) {
	this.query('drop table ' + this.escapeId(tableName), (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
	return this;
};
exports.update_item = function (tableName, field, value, rangeName=1, rangeValue=1) {
	if (field instanceof Array && value instanceof Array) {
		if (field.length === value.length)
			this.query('UPDATE ? SET ?=? WHERE ?=?;', [tableName, field, value, rangeName, rangeValue], (err, res) => {
				if (err) console.log(err.sqlMessage);
			});
		else throw new Error('field.length != value.length , field.length = ' + field.length + ' while value.length = ' + value.length);
	} else {
		this.query('UPDATE '+this.escapeId(tableName)+' SET '+this.escapeId(field)+'=? WHERE ?=?;', [value, rangeName, rangeValue], (err, res) => {
			if (err) console.log(err.sqlMessage);
		});
	}
};
exports.insert_item = function (tableName, fields, values) {
	this.query('INSERT INTO ' + this.escapeId(tableName) + ' ( ' + this.escapeId(fields.toString()) + ' ) VALUES ( ? );', [values.toString()], (err, res) => {
		if (err) console.log(err.sqlMessage);
	});
	return this;
};

exports.delete_item = function (tableName, rangeName, rangeValue) {
	this.query('DELETE FROM ' + this.escapeId(tableName) + ' WHERE '+this.escapeId(rangeName)+'=?', [rangeValue], (err, res) => {
		if (err) console.log(err.sqlMessage);
		// else console.log(res);
	});
	return this;
};

exports.select_item = function (tableName,columnName,rangeName,rangeValue,cb) {
	if(columnName instanceof Array){
		//TODO:多列查询
	}else {
		this.query('SELECT '+this.escapeId(columnName)+' FROM ' + this.escapeId(tableName) + ' WHERE ?=?', [rangeName,rangeValue], (err, res) => {
			if (err) console.log(err.sqlMessage);
			else cb(res);
		});
	}
	return this;
};
//TODO: exports.end
// exports.end = function () {
// 	this.query('quit', (err, res) => {
// 		if (err) console.log(err.sqlMessage);
// 	});
// };