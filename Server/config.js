const sql = require('mysql');
module.exports = {
	// connection:sql.createPool({
	// 	host: 'dedsec.ren',
	// 	user: 'root',
	// 	password: 'sqlmyroot',
	// 	database: 'fangdichan',
	// 	port: '3306'
	// }),
	connection:sql.createPool({
		host: '127.0.0.1',
		user: 'node',
		password: 'cxz,./123',
		database: 'fangdichan',
		port: '8889',
		waitForConnections:false,
		connectionLimit:2
	}),
	format:sql.format,
};