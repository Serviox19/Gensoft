const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));

app.get('*', function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});


server.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
