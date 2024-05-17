const http = require("http");
const {Server} = require("socket.io");

module.exports = function socketIoInit(app, cors) {
    console.log('socketIoInit')
    const server = http.createServer(app);
    // création du server socket.io
    const io = new Server(server, {
        cors: cors,
        connectionStateRecovery: {}
    })

    io.on("connection", async (socket) => {
        console.log("un utilisateur s'est connecté");

        // socket.on("deconnexion", () => {
        //   console.log("deconnexion");
        //   socket.disconnect();
        // });

        socket.on("chat message", async (message, clientOffset, callback) => {
            let result;


            //   console.log("message envoyé depuis client => ", message);
            io.emit("message sent from server", message, result.lastID);
            callback();
        });

    });

    server.listen(3001, () => {
        console.log("SERVER IS RUNNING");
    });

}