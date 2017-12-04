var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : '192.168.1.161',
  	user     : 'pc',
  	password : 'cxz,./150',
  	database : 'php_db',
	port : '8500'
});
 
connection.connect();
 
connection.query('SELECT passwd FROM user WHERE email = "1234567890@qq.com"', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});
connection.end();
