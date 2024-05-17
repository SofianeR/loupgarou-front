import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");

const Chat = ({room, username}) => {
  // Messages States
  const [message, setMessage] = useState({text: ''});
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    joinRoom();
    console.log({
      room,
      username
    })
  }, [])

  const joinRoom = () => {
    console.log("joinRoom");
    if (room !== "") {
      socket.emit("join_room", "room-".concat(room));
    }
  };

  const sendMessage = () => {
    console.log('sendMessage',message.text)
      if(message?.text === "") {
        alert('Renseigner un message')
      } else {
        setMessages((s) => {
          return [...s, {text: message.text, user: username, room: "room-".concat(room)}]
        })
        socket.emit("send_message", { text: message.text, room: "room-".concat(room), user: username });      
        setMessage({text: ""})
      }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((s) => {
        return [...s, data]
      })
    });
  }, [socket]);

  return (
    <div className="bg-gray-200 min-h-96 p-4 rounded-lg grid">
      <ul>
        <li className="text-center">Room: {room}</li>
        <li className="text-center">User: {username}</li>
      </ul>
      {/* Zone d'affichage des messages */}
      <div className="mb-4 overflow-auto">
        {/* Affichage des messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.user === username ? "text-right" : "text-left"
            }`}
          >
            
            <span className={`${ msg.user === username ? 'bg-gray-50 text-black': 'bg-blue-500 text-white'} px-2 py-1 rounded-lg inline-block break-words`}>
              <strong>{msg.user === username ? 'moi':msg.user}: </strong>{msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Zone de saisie des messages */}
      <div className="flex mb-4 content-end">
        <input
          type="text"
          value={message.text}
          onChange={(e) => setMessage({text: e.target.value})}
          placeholder="Écrire un message..."
          className="flex-grow border border-gray-400 rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chat;
