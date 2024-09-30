const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "CodeHunter_023@",
    database: "node_practice_2",
});

module.exports = mysqlPool;