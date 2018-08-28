var express = require('express');
var app = express();
var jsonServer = require('json-server');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', jsonServer.router('db.json'));

app.listen(3001, function () {
    console.log('Приклад застосунку, який прослуховує 3001-ий порт!');
});