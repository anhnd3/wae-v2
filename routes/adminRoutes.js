module.exports = (app, pool) => {

    app.get('/adm', (req, res) => {
        res.render('admin/index');
    });

    app.get('/adm/mainsite-config', (req, res) => {
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

    app.post('/adm/mainsite-config', (req, res) => {
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

        const variables = [data.path, data.content, data.content];
        pool.query(
            'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
            variables,
            (err, rows, fields) => {
                if (err) console.log(err);
            });
        res.redirect('/adm/mainsite-config');
    });

    app.get('/adm/about-config', (req, res) => {
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

    app.post('/adm/about-config', (req, res) => {
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

        const variables = [data.path, data.content, data.content];
        pool.query(
            'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
            variables,
            (err, rows, fields) => {
                if (err) console.log(err);
            });
        res.redirect('/adm/about-config');
    });

    app.get('/adm/contact-config', (req, res) => {
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

    app.post('/adm/contact-config', (req, res) => {
        const data = {
            path: '/contact',
            content: JSON.stringify({
                contactImgBackground: req.body.contactImgBackground,
                contactBigText: req.body.contactBigText,
                contactSmallText: req.body.contactSmallText,
            })
        };

        const variables = [data.path, data.content, data.content];
        pool.query(
            'INSERT INTO `layout_config` (`path`,`content`) VALUES (?,?) ON DUPLICATE KEY UPDATE `content` = ?',
            variables,
            (err, rows, fields) => {
                if (err) console.log(err);
            });
        res.redirect('/adm/contact-config');
    });
};