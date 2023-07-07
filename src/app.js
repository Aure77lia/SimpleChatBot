'use strict';

// Use dotenv to read .env vars into Node
require('dotenv').config();

// Imports dependencies and set up http server
const
  express = require('express'),
  { urlencoded, json } = require('body-parser'),
  router = require('./routes/router'),
  initWebRoutes = require("./routes/router"),
  app = express(),
  PORT = process.env.PORT || 8080;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

initWebRoutes(app);

// listen for requests :)
var listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});