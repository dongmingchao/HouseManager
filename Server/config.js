const sql = require('mysql');
module.exports = {
    connection:sql.createPool({
        host: 'dedsec.ren',
        user: 'root',
        password: 'sqlmyroot',
        database: 'fangdichan',
        port: '3306'
    }),
    format:sql.format,
};