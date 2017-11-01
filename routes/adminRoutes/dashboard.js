module.exports = app => {

    app.get('/waetools', (req, res) => {
        res.render('admin/index');
    });
};