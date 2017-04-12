const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);


server.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
