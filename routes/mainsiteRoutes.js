const async = require('async');

module.exports = (app, pool) => {

    app.get('/', (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/',
                        callback);
                },
                function (callback) {
                    pool.query('SELECT * FROM partners;',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/metaseo',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    const config = results[0][0];
                    const partners = results[1][0];
                    const header = results[2][0];
                    res.render('mainsite/index', { config: config[0].content, partners: partners, header: header[0].content });
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/about', (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/about',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM partners;',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM teams',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    const config = results[0][0];
                    const partners = results[1][0];
                    const team = results[2][0];
                    res.render('mainsite/about', { config: config[0].content, partners: partners, team: team });
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/contact', (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/contact',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    const config = results[0][0];
                    res.render('mainsite/contact', { config: config[0].content });
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });
};