var express = require('express'),
    path = require('path'),
    app = express();

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

var server = app.listen(8080, function() {
   console.log("Server running on port 8080");
});