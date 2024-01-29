const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    fs = require('fs');
const userCtrl = require('../controllers/userCtrl');

router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router
    .post('/login', userCtrl.userLogin)
    .get('/', userCtrl.userList)
    .post('/createUser', userCtrl.userCreate)
    .delete('/deleteUser/:id', userCtrl.userDelete)
    .put('/updateUser', userCtrl.userUpdate)

module.exports = router;