var express = require('express');

var path = require('path');

var app = express();
var client = require('twilio')('AC09b80b881d60aa874313f1dc1a4e54ae',
  'ed9dba1580891bdf4d73af926c4a5fbc');

var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client')));



require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function() {
  console.log('users and topics: 8000');
})