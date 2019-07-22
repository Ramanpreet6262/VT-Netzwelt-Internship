const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const error404Controller = require('./controllers/Error_404');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error404Controller.get404Page);

app.listen(3000);
