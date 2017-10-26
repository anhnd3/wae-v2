const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const keys = require('./config/keys');

mongoose.Promise = require('bluebird');
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use('/static', express.static(path.join(__dirname, '/public'), {
    fallthrough: false
}));

require('./routes/mainsiteRoutes/home')(app);
require('./routes/adminRoutes/dashboard')(app);

const PORT = 3000;
app.listen(PORT, function() {
    console.log('Server start at port: ' + PORT);
});