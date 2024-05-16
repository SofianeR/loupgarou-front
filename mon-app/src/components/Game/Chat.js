import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [role, setRole] = useState("Loups");

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", newMessage);
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-gray-200 h-96 p-4 rounded-lg grid">
      {/* Liste des destinataires */}
      <div className="mb-4">
        <label htmlFor="role" className="text-lg font-bold mb-2">
          Rôle :
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-md px-4 py-2 w-full"
        >
          <option value="Ville">Village</option>
          <option value="Loups" disabled={role === "Villageois"}>
            Loups Garou
          </option>
        </select>
      </div>

      {/* Zone d'affichage des messages */}
      <div className="mb-4 overflow-auto">
        {/* Affichage des messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span className="bg-blue-500 text-white px-2 py-1 rounded-lg inline-block break-words">
              {message.text}
            </span>
          </div>
        ))}
      </div>

      {/* Zone de saisie des messages */}
      <div className="flex mb-4 content-end">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-grow border border-gray-400 rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chat;
