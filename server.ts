// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import axios from "axios";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.client.id);

  socket.on("chat", async (props) => {
    console.log("message: " + JSON.stringify(props));

    await axios
      .post("http://localhost:3000/api/chat", {
        message: props.message,
        userId: props.userId,
        conversation: props.conversation,
      })
      .then((res) => {
        io.emit("chat", props.message);
      });
  });
});

server.listen(3001, () => {
  console.log("server running at https://localhost:3001");
});
