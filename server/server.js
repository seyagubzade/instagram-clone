const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const notificationRoutes = require("./routes/notificationsRoutes");
const messageRoutes = require("./routes/messageRoutes");
const Messages = require("./models/Message.model"); 

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://seyagubzade:seyagubzade123@cluster0.2wwolad.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //  front-end URL
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`user connected with id: ${userId}`);
    console.log("onlineUsers>>>>",onlineUsers)
  });
  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.recipientId);
    const { message, recipientId, senderId } = data;
    const newData = {
      message: {
        text: message,
      },
      sender: senderId,
      recipient: recipientId,
      status: "sent",
      messageType: "text",
      createdAt: new Date().toISOString(),
    };
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("recieve-message", newData);
    }
  });
});


app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", notificationRoutes);
app.use("/api", messageRoutes);
