const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Cấu hình Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*",  // Chấp nhận tất cả kết nối (hoặc đổi thành domain cụ thể)
    methods: ["GET", "POST"],
  },
});

// Khi client kết nối
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("📩 Message received:", message);
    io.emit("receiveMessage", message); // Phát lại tin nhắn đến tất cả client
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Lắng nghe server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
