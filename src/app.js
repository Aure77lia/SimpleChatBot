'use strict';

// Use dotenv to read .env vars into Node
require('dotenv').config();
import initWebRoutes from "./routes/router";

// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  { urlencoded, json } = require('body-parser'),
  app = express();

// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());

initWebRoutes(app);
// Respond with 'Hello World' when a GET request is made to the homepage

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});