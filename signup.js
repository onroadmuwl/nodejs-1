var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'demo'

});
router.get('/', function(req, res) {
    res.render('signup', { path: 'signup.html' });
    //res.sendFile('index.html');
});
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
        if (err) {
            res.status(500).send("服务器出错").end();
        } else {
            if (data.length != 0) {
                res.status(400).send('该用户已经存在').end();
            } else {
                db.query(`INSERT INTO admin_table (username,password) VALUES ('${username}','${password}')`, (err, data) => {
                    if (err) {
                        throw err;
                    } else { //成功
                        res.status(200).send('注册成功').end();
                    }
                })
            }
        }

    });

});


module.exports = router;