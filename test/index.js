const { io } = require("socket.io-client");
const socket = io.connect("http://localhost:3001");

function test(message, room) {
    console.log("test")  

    const username = "zedog"
    socket.emit("join_room", "room-".concat(room));
    socket.emit("send_message", { message, room: "room-".concat(room), user: username });    
}

test("Hello from zeuDOG !!", "Générale");