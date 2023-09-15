// Importing required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const socket = require('socket.io');


// Setting up express js and cors 
const app = express();
app.use(cors());
app.use(express.json());

// Setting up routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

// Connecting to server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// Connecting to socket
const io = socket(server, {
  cors: {
    origin: "https://vj-chat-app.vercel.app",
    // origin: "http://localhost:4000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver);
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
    } 
  });
});
