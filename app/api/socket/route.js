import { Server } from "socket.io";

let io;

export function GET() {
  if (!io) {
    io = new Server(globalThis.server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
    });

    console.log("Socket.io server started");
  }

  return new Response("Socket server running");
}
