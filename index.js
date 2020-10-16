const express = require('express');
const exhbs = require('express-handlebars');
const routes = require('./routes/handlers');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

app.engine(
  'hbs',
  exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(fileUpload());
app.use('/', routes);

app.listen(5000, () => {
  console.log('Listening to port: 5000');
});
