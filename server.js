// server.js
import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  // Store globally so you can use it in server actions
  global.io = io;

  io.on("connection", (socket) => {
    console.log("🔥 Socket connected:", socket.id);
  });

  httpServer.listen(3000, () => {
    console.log("🚀 Server ready on http://localhost:3000");
  });
});
