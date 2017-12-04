const fs = require('fs');
const url = require('url');
const sql = require('./sqlDAO');
var ccap = require('ccap');
var querystring = require('querystring');

function route(req, resp) {
	var getdata = url.parse(req.url, true);
	var postdata = '';
	req.on('data', chunk => {
		postdata += chunk;
	})
	;
	console.log(getdata);
	var path = getdata.pathname;
	var pp = path.split('/');
	path = pp[pp.length - 1];
	switch (path) {
	// cas
	case '':
		return fs.readFileSync('./Home/login.html');
		//黑名单
	case 'myServer.js':
	case 'myRoute.js':
		return null;
		//--------------------------------
	case 'version':
		return process.version;
	case 'uploadExcel':
		req.on('end',()=>{
			console.log(postdata);
		});
		return 1;
	case 'captcha':{
		let captcha = ccap({
			width:207,
			height:60,
			offset:32
		}).get();
		console.log(captcha[0]);
		return captcha[1];
	}
	case 'login':
		req.on('end', function () {
			postdata = querystring.parse(postdata);
			sql.login_check(postdata, resp);
		});
		return 1;
	case 'sign_up':
		req.on('end', function () {
			postdata = querystring.parse(postdata);
			sql.sign_up(postdata, resp);
		});
		return 1;
	default :{
		let filetype = path.split('.')[1];
		switch (filetype) {
		case 'css':
			return fs.readFileSync('./css/' + path);
		case 'html':
			return fs.readFileSync('./Home/' + path);
		case 'js':
			return fs.readFileSync('./js/' + path);
		default:
			break;
		}
		return null;
	}
	}
}

var AllowType = ['css', 'html'];
var PartAllowType = ['js'];
module.exports = route;
