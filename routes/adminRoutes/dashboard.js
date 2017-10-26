module.exports = app => {

    app.get('/admin', (req, res) => {
        res.send('welcome to wae admin');
    });
};