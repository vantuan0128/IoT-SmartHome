const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'iot'
});

db.connect(err => {
    if (err) {
        console.error("Lỗi kết nối tới cơ sở dữ liệu MySQL: " + err.stack);
        return;
    }
    console.log("Kết nối thành công đến cơ sở dữ liệu MySQL");
});

module.exports = db;