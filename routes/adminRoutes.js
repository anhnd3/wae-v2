const async = require('async');
const md5 = require('md5');
const moment = require('moment');

const keys = require('../config/keys');

module.exports = (app, pool) => {

    // ======================== Dashboard _ Blank Page ==================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm', requireLogin, (req, res) => {
        res.render('admin/index');
    });
    // ===================================================================================
    // ===================================================================================
    // ======================== Config Layout View =======================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/config/mainsite', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_mainsite', { config: result[0] });
                        } else {
                            res.render('admin/config_mainsite', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/mainsite', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    introduceVideo: req.body.introduceVideo,
                    introduceImgBackground: req.body.introduceImgBackground,
                    introduceBigText: req.body.introduceBigText,
                    introduceSmallText: req.body.introduceSmallText,
                    aboutBigText: req.body.aboutBigText,
                    aboutSmallText: req.body.aboutSmallText,
                    presentationVideo: req.body.presentationVideo,
                    presentationImgBackground: req.body.presentationImgBackground,
                    presentationBigText: req.body.presentationBigText,
                    presentationSmallText: req.body.presentationSmallText,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e)
        }
        res.redirect('/adm/config/mainsite');
    });

    app.get('/adm/config/about', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/about',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_about', { config: result[0] });
                        } else {
                            res.render('admin/config_about', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/about', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/about',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    aboutImgBackground: req.body.aboutImgBackground,
                    aboutBigText: req.body.aboutBigText,
                    aboutSmallText: req.body.aboutSmallText,
                    skillTitle: req.body.skillTitle,
                    skillDescription: req.body.skillDescription,
                    skillListing: req.body.skillListing,
                    presentationVideo: req.body.presentationVideo,
                    presentationImgBackground: req.body.presentationImgBackground,
                    presentationBigText: req.body.presentationBigText,
                    presentationSmallText: req.body.presentationSmallText,
                    about2ImgBackground: req.body.about2ImgBackground,
                    about2Title: req.body.about2Title,
                    about2Content: req.body.about2Content,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/about');
    });

    app.get('/adm/config/contact', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/contact',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_contact', { config: result[0] });
                        } else {
                            res.render('admin/config_contact', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/contact', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/contact',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    contactImgBackground: req.body.contactImgBackground,
                    contactBigText: req.body.contactBigText,
                    contactSmallText: req.body.contactSmallText,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/contact');
    });

    app.get('/adm/config/course', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/course',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_course', { config: result[0] });
                        } else {
                            res.render('admin/config_course', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/course', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/course',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    courseImgBackground: req.body.courseImgBackground,
                    courseBigText: req.body.courseBigText,
                    courseSmallText: req.body.courseSmallText,
                    courseBasicImgBackground: req.body.courseBasicImgBackground,
                    courseBasicBigText: req.body.courseBasicBigText,
                    courseBasicSmallText: req.body.courseBasicSmallText,
                    courseIoTImgBackground: req.body.courseIoTImgBackground,
                    courseIoTBigText: req.body.courseIoTBigText,
                    courseIoTSmallText: req.body.courseIoTSmallText,
                    courseSTEAMImgBackground: req.body.courseSTEAMImgBackground,
                    courseSTEAMBigText: req.body.courseSTEAMBigText,
                    courseSTEAMSmallText: req.body.courseSTEAMSmallText,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/course');
    });

    app.get('/adm/config/metaseo', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/metaseo',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_metaseo', { config: result[0] });
                        } else {
                            res.render('admin/config_metaseo', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/metaseo', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/metaseo',
                content: JSON.stringify({
                    metaDescription: req.body.metaDescription,
                    metaKeywords: req.body.metaKeywords,
                    icon57: req.body.icon57,
                    icon60: req.body.icon60,
                    icon72: req.body.icon72,
                    icon76: req.body.icon76,
                    icon114: req.body.icon114,
                    icon120: req.body.icon120,
                    icon144: req.body.icon144,
                    icon152: req.body.icon152,
                    icon180: req.body.icon180,
                    icon192: req.body.icon192,
                    icon32: req.body.icon32,
                    icon96: req.body.icon96,
                    icon16: req.body.icon16
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/metaseo');
    });

    app.get('/adm/config/news', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/news',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_news', { config: result[0] });
                        } else {
                            res.render('admin/config_news', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/news', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/news',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    newsImgBackground: req.body.newsImgBackground,
                    newsBigText: req.body.newsBigText,
                    newsSmallText: req.body.newsSmallText,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/news');
    });

    app.get('/adm/config/tutorial', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `layout_config` WHERE `path` = ?',
                '/tutorial',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/config_tutorial', { config: result[0] });
                        } else {
                            res.render('admin/config_tutorial', { config: {} });
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.post('/adm/config/tutorial', requireLogin, (req, res) => {
        try {
            const data = {
                path: '/tutorial',
                content: JSON.stringify({
                    pageTitle: req.body.pageTitle,
                    tutorialImgBackground: req.body.tutorialImgBackground,
                    tutorialBigText: req.body.tutorialBigText,
                    tutorialSmallText: req.body.tutorialSmallText,
                })
            };

            pool.query(
                'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
                [data.path, data.content, data.content],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/config/tutorial');
    });
    // ===================================================================================
    // ===================================================================================
    // ================================== Teams Config ===================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/teams', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `teams`',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/teams', { teams: result });
                        } else {
                            res.render('admin/teams');
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.get('/adm/teams/details/:id', requireLogin, (req, res) => {
        const memberId = req.params.id;
        try {
            pool.query(
                'SELECT * FROM `teams` WHERE `id` = ?',
                [memberId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/team_details', { member: result[0] });
                        } else {
                            res.render('admin/team_details');
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm/teams');
        }
    });

    app.post('/adm/teams/details', requireLogin, (req, res) => {
        try {
            const data = {
                id: (req.body.memberId) ? parseInt(req.body.memberId) : 0,
                fullName: req.body.fullName,
                title: req.body.title,
                avatar: req.body.avatar,
                shortDescription: req.body.shortDescription,
                facebook: req.body.facebook,
                linkedin: req.body.linkedin,
                skype: req.body.skype,
                email: req.body.email,
                status: (req.body.status === 'on') ? 1 : 0
            };

            console.log(data);

            pool.query(
                'INSERT INTO `teams` (`id`,`fullName`,`avatar`,`title`,`shortDescription`,`facebook`,`linkedin`, `email`,`skype`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `fullName`=?,`avatar`=?,`title`=?,`shortDescription`=?,`facebook`=?,`linkedin`=?,`email`=?,`skype`=?,`status`=?',
                [data.id, data.fullName, data.avatar, data.title, data.shortDescription, data.facebook, data.linkedin, data.email, data.skype, data.status, data.fullName, data.avatar, data.title, data.shortDescription, data.facebook, data.linkedin, data.email, data.skype, data.status],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/teams');
    });

    app.get('/adm/teams/delete/:id', requireLogin, (req, res) => {
        const memberId = req.params.id;
        try {
            pool.query(
                'DELETE FROM `teams` WHERE `id` = ?',
                [memberId],
                (err, result) => {
                    if (err) console.log(err);
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
        res.redirect('/adm/teams');
    });
    // ===================================================================================
    // ===================================================================================
    // =============================== Partners Config ===================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/partners', requireLogin, (req, res) => {
        try {
            pool.query(
                'SELECT * FROM `partners`',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/partners', { partners: result });
                        } else {
                            res.render('admin/partners');
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.get('/adm/partners/details/:id', requireLogin, (req, res) => {
        const memberId = req.params.id;
        try {
            pool.query(
                'SELECT * FROM `partners` WHERE `id` = ?',
                [memberId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/adm');
                    } else {
                        if (result.length > 0) {
                            res.render('admin/partner_details', { member: result[0] });
                        } else {
                            res.render('admin/partner_details');
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm/partners');
        }
    });

    app.post('/adm/partners/details', requireLogin, (req, res) => {
        try {
            const data = {
                id: (req.body.partnerId) ? parseInt(req.body.partnerId) : 0,
                name: req.body.name,
                logo: req.body.logo,
                description: req.body.description,
                website: req.body.website,
                status: (req.body.status === 'on') ? 1 : 0
            };

            pool.query(
                'INSERT INTO `partners` (`id`,`name`,`logo`,`description`,`website`,`status`) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `name`=?,`logo`=?,`description`=?,`website`=?,`status`=?',
                [data.id, data.name, data.logo, data.description, data.website, data.status, data.name, data.logo, data.description, data.website, data.status],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/partners');
    });

    app.get('/adm/partners/delete/:id', requireLogin, (req, res) => {
        const memberId = req.params.id;
        try {
            pool.query(
                'DELETE FROM `partners` WHERE `id` = ?',
                [memberId],
                (err, result) => {
                    if (err) console.log(err);
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
        res.redirect('/adm/partners');
    });
    // ===================================================================================
    // ===================================================================================
    // ================================= Course Config ===================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/courses', requireLogin, (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `courses`',
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `teams`',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    res.redirect('/adm');
                }
                const courses = results[0][0];
                const teams = results[1][0];
                courses.forEach(course => {
                    const teacher = teams.find(team => { return team.id === course.teacher });
                    course.teacher = teacher.fullName;
                });
                res.render('admin/courses', { courses: courses });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.get('/adm/courses/details/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `courses` WHERE `id` = ?',
                        [id],
                        callback);
                },
                function (callback) {
                    pool.query(
                        'SELECT * FROM `teams`',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    res.redirect('/adm/courses');
                }
                res.render('admin/course_details', { course: results[0][0][0], teams: results[1][0] });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm/courses');
        }
    });

    app.post('/adm/courses/details', requireLogin, (req, res) => {
        try {
            const data = {
                id: (req.body.id) ? parseInt(req.body.id) : 0,
                title: req.body.title,
                classType: req.body.classType,
                teacher: req.body.teacher,
                thumbnail: req.body.thumbnail,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                highlight: (req.body.highlight === 'on') ? 1 : 0,
                status: (req.body.status === 'on') ? 1 : 0
            };

            pool.query(
                'INSERT INTO `courses` (`id`,`title`,`classType`,`thumbnail`,`shortDescription`,`content`,`teacher`,`highlight`,`status`) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `title`=?,`classType`=?,`thumbnail`=?,`shortDescription`=?,`content`=?,`teacher`=?,`highlight`=?,`status`=?',
                [data.id, data.title, data.classType, data.thumbnail, data.shortDescription, data.content, data.teacher, data.highlight, data.status, data.title, data.classType, data.thumbnail, data.shortDescription, data.content, data.teacher, data.highlight, data.status],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/courses');
    });

    app.get('/adm/courses/delete/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            pool.query(
                'DELETE FROM `courses` WHERE `id` = ?',
                [id],
                (err, result) => {
                    if (err) console.log(err);
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
        res.redirect('/adm/courses');
    });
    // ===================================================================================
    // ===================================================================================
    // ================================= News Config =====================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/news', requireLogin, (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `news`',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    res.redirect('/adm');
                }
                const news = results[0][0];
                res.render('admin/news', { news: news, moment: moment });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.get('/adm/news/details/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `news` WHERE `id` = ?',
                        [id],
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    res.redirect('/adm/news');
                }
                res.render('admin/news_details', { news: results[0][0][0] });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm/news');
        }
    });

    app.post('/adm/news/details', requireLogin, (req, res) => {
        try {
            const data = {
                id: (req.body.id) ? parseInt(req.body.id) : 0,
                title: req.body.title,
                author: req.body.author,
                thumbnail: req.body.thumbnail,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                highlight: (req.body.highlight === 'on') ? 1 : 0,
                status: (req.body.status === 'on') ? 1 : 0,
                tag: req.body.tag,
                group: req.body.group
            };

            if (data.id === 0) {
                data.time = new Date();
            }

            pool.query(
                'INSERT INTO `news` (`id`,`title`,`time`,`thumbnail`,`shortDescription`,`content`,`author`,`highlight`,`status`,`tag`,`group`) VALUES (?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `title`=?,`thumbnail`=?,`shortDescription`=?,`content`=?,`author`=?,`highlight`=?,`status`=?,`tag`=?,`group`=?',
                [data.id, data.title, data.time, data.thumbnail, data.shortDescription, data.content, data.author, data.highlight, data.status, data.tag, data.group, data.title, data.thumbnail, data.shortDescription, data.content, data.author, data.highlight, data.status, data.tag, data.group],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/news');
    });

    app.get('/adm/news/delete/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            pool.query(
                'DELETE FROM `news` WHERE `id` = ?',
                [id],
                (err, result) => {
                    if (err) console.log(err);
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
        res.redirect('/adm/news');
    });
    // ===================================================================================
    // ===================================================================================
    // =============================== Tutorial Config ===================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/tutorial', requireLogin, (req, res) => {
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `tutorials`',
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    res.redirect('/adm');
                }
                const tutorial = results[0][0];
                res.render('admin/tutorial', { tutorial:  tutorial, moment: moment });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm');
        }
    });

    app.get('/adm/tutorial/details/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            async.parallel([
                function (callback) {
                    pool.query(
                        'SELECT * FROM `tutorials` WHERE `id` = ?',
                        [id],
                        callback);
                }
            ], function (err, results) {
                if (err) {
                    console.log(err);
                    res.redirect('/adm/tutorial');
                }
                res.render('admin/tutorial_details', { tutorial: results[0][0][0] });
            });
        } catch (err) {
            console.log('exception: ' + err);
            res.redirect('/adm/news');
        }
    });

    app.post('/adm/tutorial/details', requireLogin, (req, res) => {
        try {
            const data = {
                id: (req.body.id) ? parseInt(req.body.id) : 0,
                title: req.body.title,
                author: req.body.author,
                thumbnail: req.body.thumbnail,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                highlight: (req.body.highlight === 'on') ? 1 : 0,
                status: (req.body.status === 'on') ? 1 : 0,
                tag: req.body.tag,
                group: req.body.group
            };

            if (data.id === 0) {
                data.time = new Date();
            }

            pool.query(
                'INSERT INTO `tutorials` (`id`,`title`,`time`,`thumbnail`,`shortDescription`,`content`,`author`,`highlight`,`status`,`tag`,`group`) VALUES (?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `title`=?,`thumbnail`=?,`shortDescription`=?,`content`=?,`author`=?,`highlight`=?,`status`=?,`tag`=?,`group`=?',
                [data.id, data.title, data.time, data.thumbnail, data.shortDescription, data.content, data.author, data.highlight, data.status, data.tag, data.group, data.title, data.thumbnail, data.shortDescription, data.content, data.author, data.highlight, data.status, data.tag, data.group],
                (err, rows, fields) => {
                    if (err) console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
        res.redirect('/adm/tutorial');
    });

    app.get('/adm/tutorial/delete/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        try {
            pool.query(
                'DELETE FROM `tutorials` WHERE `id` = ?',
                [id],
                (err, result) => {
                    if (err) console.log(err);
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
        res.redirect('/adm/tutorial');
    });

    // ===================================================================================
    // ===================================================================================
    // ================================== Admin Login ====================================
    // ===================================================================================
    // ===================================================================================
    app.get('/adm/login', (req, res) => {
        try {
            res.render('admin/login');
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.post('/adm/login', (req, res) => {
        const userInfo = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            pool.query(
                'SELECT * FROM `users` WHERE `email` = ?',
                [userInfo.email],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        const user = result[0];
                        if (!user) {
                            res.redirect('/adm/login');
                        } else {
                            const verifyPassword = md5(userInfo.password);
                            if (user.authenticate != verifyPassword) {
                                res.redirect('/adm/login');
                            } else {
                                req[keys.cookieName].user = user;
                                res.redirect('/adm');
                            }
                        }
                    }
                });
        } catch (err) {
            console.log('exception: ' + err);
        }
    });

    app.get('/adm/auth/logout', function (req, res) {
        req[keys.cookieName].reset();
        res.redirect('/adm/login');
    });

    function requireLogin(req, res, next) {
        if (!req.user) {
            res.redirect('/adm/login');
        } else {
            next();
        }
    }
    // ===================================================================================
    // ===================================================================================
};