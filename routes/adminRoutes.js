const async = require('async');
const md5 = require('md5');

const keys = require('../config/keys');

module.exports = (app, pool) => {

    // ======================== Dashboard - Blank Page ==================================
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
                            res.render('admin/config-mainsite', { config: result[0] });
                        } else {
                            res.render('admin/config-mainsite', { config: {} });
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
                            res.render('admin/config-about', { config: result[0] });
                        } else {
                            res.render('admin/config-about', { config: {} });
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
                            res.render('admin/config-contact', { config: result[0] });
                        } else {
                            res.render('admin/config-contact', { config: {} });
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
                            res.render('admin/config-course', { config: result[0] });
                        } else {
                            res.render('admin/config-course', { config: {} });
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
                    courseImgBackground: req.body.courseImgBackground,
                    courseBigText: req.body.courseBigText,
                    courseSmallText: req.body.courseSmallText,
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
                status: (req.body.status === 'on') ? 1 : 0
            };

            pool.query(
                'INSERT INTO `courses` (`id`,`title`,`classType`,`thumbnail`,`shortDescription`,`content`,`teacher`,`status`) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `title`=?,`classType`=?,`thumbnail`=?,`shortDescription`=?,`content`=?,`teacher`=?,`status`=?',
                [data.id, data.title, data.classType, data.thumbnail, data.shortDescription, data.content, data.teacher, data.status, data.title, data.classType, data.thumbnail, data.shortDescription, data.content, data.teacher, data.status],
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

    app.get('/adm/auth/logout', function(req, res) {
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