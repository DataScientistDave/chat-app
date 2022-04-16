const express = require("express");
const app = express();
// Http is built in module to create servers
const http = require("http");
// Server is going to be express application
const server = http.createServer(app);
const { Server } = require("socket.io");
// Mount socket server to express app. IO is the server instance
const io = new Server(server);
app.get("/", (req, res) => {});

io.on("connection", () => {
  console.log("a user connected");
  // Each client will communicate with the server (IO) through a socket with a unique id
  socket.emit("your id", socket.id);

  socket.on("disconnect", () => {
    console.log("use disconnected");
  });
  socket.on("chat message", (msg) => {
    // Emit to all users
    io.emit("message", msg);
  });
});

server.listen(4000, () => {
  console.log("Now listening on port 4000");
});
