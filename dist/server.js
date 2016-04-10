var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static('dist'));
app.listen(port);
