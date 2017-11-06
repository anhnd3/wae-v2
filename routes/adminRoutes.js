module.exports = (app, pool) => {

    app.get('/adm', (req, res) => {
        res.render('admin/index');
    });
};