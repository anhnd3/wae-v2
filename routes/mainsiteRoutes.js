module.exports = (app, pool) => {

    app.get('/', (req, res) => {
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM partner', function(error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) throw error;

                // Don't use the connection here, it has been returned to the pool.
                results.forEach(function(tmpPartner) {
                    console.log(tmpPartner.name);
                    console.log(tmpPartner.thumbnail);
                }, this);
            });
        });
        res.render('mainsite/index');
    });
};