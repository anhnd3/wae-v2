const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const keys = require('./config/keys');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: keys.mysqlConnectionLimit,
    host: keys.mysqlHost,
    user: keys.mysqlUsername,
    password: keys.mysqlPassword,
    database: keys.mysqlDatabase
});

const app = express();
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use('/statics', express.static(path.join(__dirname, '/public'), { fallthrough: false }));
app.use('/scripts', express.static(__dirname + '/node_modules'));

require('./routes/mainsiteRoutes')(app, pool);
require('./routes/adminRoutes')(app, pool);

const PORT = 3000;
app.listen(PORT, function() {
    console.log('Server start at port: ' + PORT);
});