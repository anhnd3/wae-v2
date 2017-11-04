module.exports = (app, pool) => {

    app.get('/waetools', (req, res) => {
        res.render('admin/index');
    });
};