const http = require("http");
const socketIo = require("socket.io");

module.exports = function socketIoInit(app) {
    const server = http.createServer(app);
    // création du server socket.io
    const io = socketIo(server);

    io.on("connection", (socket) => {
        console.log("Nouvel utilisateur connecté");

        socket.on("sendMessage", (message) => {
            io.emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("Utilisateur déconnecté");
        });
    });
}