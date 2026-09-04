const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send("Server running!");
});

io.on("connection", (socket) => {
    console.log("Client connected");

socket.on("send_mj_command", (data) => {
        console.log(`Commande MJ [${data.type}]`, data.payload || "");
        socket.broadcast.emit("receive_mj_command", data);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected : ${socket.id}`);
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
