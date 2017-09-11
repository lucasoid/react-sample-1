/*jslint node: true */

'use strict';

var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var DBNAME = 'thread.sqlite';
var port = process.env.PORT || 3000;
function initDatabase() {
    var db = new sqlite3.Database(DBNAME);
    db.run('CREATE TABLE IF NOT EXISTS thread (msg TEXT, user TEXT, timestamp INTEGER)');
    db.close();
}

app.listen(port, function () {
    initDatabase();
});

app.get('/api/chat', function (req, res) {
    var db = new sqlite3.Database(DBNAME);
    db.serialize(function () {
        var limit = req.query.limit || 10;
        db.all('SELECT rowid AS id, msg, user, timestamp FROM thread ORDER BY timestamp DESC LIMIT ?', [limit], function (error, rows) {
            res.send(rows);
        });
    });
});

app.post('/api/chat', function (req, res) {
    if (req.body.msg && req.body.user && req.body.timestamp) {
        var db = new sqlite3.Database(DBNAME);
        db.serialize(function () {
            var stmt = db.prepare('INSERT INTO thread (msg, user, timestamp) VALUES (?, ?, ?)');
            stmt.run([req.body.msg, req.body.user, req.body.timestamp]);
            db.get('SELECT rowid AS id, msg, user, timestamp FROM thread ORDER BY timestamp DESC LIMIT 1', [], function (error, row) {
                res.send(JSON.stringify(row));
            });
        });
    }
});

// nuke the whole thing
app.post('/api/clear', function (req, res) {
    var db = new sqlite3.Database(DBNAME);
    db.serialize(function () {
        var stmt = db.prepare('DELETE FROM thread WHERE 1');
        stmt.run();
        res.send('History deleted.');
    });
});