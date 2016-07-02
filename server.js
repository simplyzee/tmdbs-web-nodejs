"use strict";
const express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8080;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);
console.log(`Server started running on ${port}`);

module.exports = app;
