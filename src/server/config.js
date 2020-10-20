// Para unir directorios
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
// const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

// using passport
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
require('../helpers/passport');
const { database } = require('../keys');


// importo las rutas
const routes = require('../routes/index');

// Configurar express
module.exports = app => {
  // settings
  app.set('port', process.env.PORT || 3000);
  // como views está en otro directorio, concateno para decirle a express que view está en: src/views
  app.set('views', path.join(__dirname, '../views'));
  // configuro el motor de plantillas
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  }));
  app.set('view engine', '.hbs');

  // middlewares
  app.use(morgan('dev'));
  // app.use(multer({ dest: path.join(__dirname, '../public/uploads/temp') }).single('image'));
  // para recibir datos de los formularios
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // configuro la session
  app.use(session({
    secret: 'nodejs',
    resave: false,
    saveUninitialized: false,
    // utilizo la base de datos para almancenar mi sesion
    store: new MySqlStore(database)
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // routes
  routes(app);

  // static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // errorhandlers
  if ('development' === app.get('env')) {
    app.use(errorHandler);
  }

  return app;
};