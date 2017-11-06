module.exports = (app, pool) => {

    app.get('/', (req, res) => {
        res.render('mainsite/index');
    });
};