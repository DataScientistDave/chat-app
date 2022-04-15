const express = require("express");
const app = express();
// Http is built in module to create servers
const http = require("http");
// Server is going to be express application
const server = http.createServer(app);

app.get("/", (req, res) => {});

server.listen(4000, () => {
  console.log("Now listening on port 4000");
});
