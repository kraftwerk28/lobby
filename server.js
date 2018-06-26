'use strict';
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const ref = req.url === '/' ? './lobby.html' : '.' + req.url;
  fs.readFile(ref, 'utf8', (err, data) => {
    if (err) throw err;
    res.end(data);
  });
}).listen(8080);
