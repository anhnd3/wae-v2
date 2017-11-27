const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const session = require('client-sessions');

const keys = require('./config/keys');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: keys.mysqlConnectionLimit,
    host: keys.mysqlHost,
    user: keys.mysqlUsername,
    password: keys.mysqlPassword,
    database: keys.mysqlDatabase,
    typeCast: (field, next) => {
        if (field.type == 'TINY' && field.length == 1) {
            return (field.string() === '1'); // 1 = true, 0 = false
        }
        return next();
    }
});

const app = express();
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet.noCache());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    cookieName: keys.cookieName,
    secret: keys.cookieKey,
    duration: 30 * 60 * 1000,
    activeDuration: 10 * 60 * 1000,
    cookie: {
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: false, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
}));
app.use('/statics', express.static(path.join(__dirname, '/public'), { fallthrough: false }));
app.use('/scripts', express.static(__dirname + '/node_modules'));

// Middleware set session to locals
app.use(function (req, res, next) {
    if (req[keys.cookieName] && req[keys.cookieName].user) {
        pool.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req[keys.cookieName].user.email],
            (err, result) => {
                if (result[0]) {
                    const user = result[0];
                    req.user = user;
                    delete req.user.password;   // delete the password from the session
                    req[keys.cookieName].user = user;   //refresh the session value
                    res.locals.user = user;
                }
                // finishing processing the middleware and run the route
                next();
            });
    } else {
        next();
    }
});

require('./routes/mainsiteRoutes')(app, pool);
require('./routes/adminRoutes')(app, pool);

const PORT = 3000;
app.listen(PORT, function () {
    console.log('Server start at port: ' + PORT);
});