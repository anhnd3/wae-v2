const async = require('async');
const Hashids = require('hashids');
const hashids = new Hashids('wae-v2', 10);

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
                    res.render('mainsite/index', {
                        config: config[0].content,
                        partners: partners,
                        header: header[0].content
                    });
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
                        'SELECT * FROM `partners` WHERE `status` = 1;',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `teams` WHERE `status` = 1;',
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
                    const team = results[2][0];
                    const header = results[3][0];
                    res.render('mainsite/about', {
                        config: config[0].content,
                        partners: partners,
                        team: team,
                        header: header[0].content
                    });
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
                    const header = results[1][0];
                    res.render('mainsite/contact', {
                        config: config[0].content,
                        header: header[0].content
                    });
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/course', (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/course',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT `courses`.*,`teams`.`fullName` FROM `courses` LEFT JOIN `teams` ON `courses`.`teacher` = `teams`.`id` WHERE `courses`.`highlight` = 1 ORDER BY `classType` ASC;',
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
                    const courses = results[1][0];
                    const header = results[2][0];

                    const dataOutput = {
                        config: config[0].content,
                        header: header[0].content
                    }
                    if (courses.length >= 1) {
                        const basic = courses[0];
                        basic.id = hashids.encode(basic.id);
                        dataOutput.basic = basic;
                    }
                    if (courses.length >= 2) {
                        const iot = courses[1];
                        iot.id = hashids.encode(iot.id);
                        dataOutput.iot = iot;
                    }
                    if (courses.length >= 3) {
                        const steam = courses[2];
                        steam.id = hashids.encode(steam.id);
                        dataOutput.steam = steam;
                    }
                    res.render('mainsite/course', dataOutput);
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/course/:courseType', (req, res) => {
        const courseType = req.params.courseType;
        let classType;
        switch (courseType) {
            case 'arduino-co-ban':
                classType = 1;
                break;
            case 'arduino-iot':
                classType = 2;
                break;
            case 'steam':
                classType = 3;
                break;
            default:
                res.redirect('/course');
        }
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/course',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT `courses`.*,`teams`.`fullName` FROM `courses` LEFT JOIN `teams` ON `courses`.`teacher` = `teams`.`id` WHERE `courses`.`classType` = ? ORDER BY `courses`.`id` DESC LIMIT 0,5;',
                        classType,
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
                    let courses = results[1][0];
                    const header = results[2][0];

                    courses = courses.map(course => {
                        course.id = hashids.encode(course.id);
                        return course;
                    });

                    const dataOutput = {
                        classType: courseType,
                        config: config[0].content,
                        header: header[0].content,
                        courses: courses
                    }

                    res.render('mainsite/course_listing', dataOutput);
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/course/:courseType/:courseId', (req, res) => {
        let courseId = req.params.courseId;
        courseId = hashids.decode(courseId);
        const courseType = req.params.courseType;
        let classType;
        switch (courseType) {
            case 'arduino-co-ban':
                classType = 1;
                break;
            case 'arduino-iot':
                classType = 2;
                break;
            case 'steam':
                classType = 3;
                break;
            default:
                res.redirect('/course');
        }
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/course',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT `courses`.*,`teams`.`fullName` FROM `courses` LEFT JOIN `teams` ON `courses`.`teacher` = `teams`.`id` WHERE `courses`.`classType` = ? ORDER BY `courses`.`id` DESC LIMIT 0,5;',
                        classType,
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT `courses`.*,`teams`.`fullName` FROM `courses` LEFT JOIN `teams` ON `courses`.`teacher` = `teams`.`id` WHERE `courses`.`id` = ?;',
                        courseId,
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
                    let courses = results[1][0];
                    let courseDetail = results[2][0][0];
                    const header = results[3][0];


                    courses = courses.map(course => {
                        course.id = hashids.encode(course.id);
                        return course;
                    });

                    if (!courseDetail || !courseDetail.id) {
                        res.redirect(`/course/${courseType}`);
                        return;
                    }

                    const dataOutput = {
                        classType: courseType,
                        config: config[0].content,
                        header: header[0].content,
                        courses: courses,
                        course: courseDetail
                    }
                    res.render('mainsite/course_detail', dataOutput);
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/news', (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/news',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `news` ORDER BY `id` DESC LIMIT 0,5;',
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
                    let news = results[1][0];
                    const header = results[2][0];

                    const dataOutput = {
                        config: config[0].content,
                        header: header[0].content
                    }

                    news = news.map(tmpNews => {
                        tmpNews.id = hashids.encode(tmpNews.id);
                        return tmpNews;
                    });

                    dataOutput.news = news;
                    res.render('mainsite/news_listing', dataOutput);
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/news/:newsId', (req, res) => {
        let newsId = req.params.newsId;
        newsId = hashids.decode(newsId);
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `layout_config` WHERE `path` = ?;',
                        '/news',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `news` ORDER BY `id` DESC LIMIT 0,5;',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `news` WHERE `id`=?',
                        newsId,
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
                    let news = results[1][0];
                    let newsDetail = results[2][0][0];
                    const header = results[3][0];


                    news = news.map(tmpNews => {
                        tmpNews.id = hashids.encode(tmpNews.id);
                        return tmpNews;
                    });

                    if (!newsDetail || !newsDetail.id) {
                        res.redirect('/news');
                        return;
                    }

                    const dataOutput = {
                        config: config[0].content,
                        header: header[0].content,
                        news: news,
                        newsDetail: newsDetail
                    }

                    res.render('mainsite/news_detail', dataOutput);
                }
            });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });
};