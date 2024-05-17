const http = require("http");
const {Server} = require("socket.io");

module.exports = function socketIoInit(app, cors) {
    console.log('socketIoInit')
    const server = http.createServer(app);
    
    // création du server socket.io
    const io = new Server(server, {
        cors: cors,
    })

    io.on("connection", async (socket) => {  
        console.log(`User Connected: ${socket.id}`); 
       
        socket.on("join_room", (data, callback) => {
            console.log("on join_room: ", data)
            socket.join(data);
          });
        
          socket.on("send_message", (data) => {
            console.log("on send_message: ", data)
            socket.to(data.room).emit("receive_message", {
                text: data.message,
                time: new Date(),
                user: data.user
            });
          });
    });

    server.listen(3001, () => {
        console.log("SERVER IS RUNNING");
    });

}