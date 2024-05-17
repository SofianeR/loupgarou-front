const { io } = require("socket.io-client");
const socket = io.connect("http://localhost:3001");

function test() {
    console.log("test")  

    const message = 'test message'
    const username = "zedog"
    const room = 'Générale'
    socket.emit("join_room", "room-".concat(room));
    socket.emit("send_message", { message, room: "room-".concat(room), user: username });    
}
test();