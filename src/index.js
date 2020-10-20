const express = require('express');
const config = require('./server/config');

// Database
require('./database');
// Paso el objeto generado por express a config, donde se va a generar toda la configuracion relacionada a express
const app = config(express());

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});