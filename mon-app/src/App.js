import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Join from "./views/Join";
import Game from "./views/Game";
import Create from "./views/Create";
import Account from "./views/Account";
import AccountFake from "./views/AccountFake";

import HeaderHome from "./components/Header";
import Footer from "./components/Footer";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App = () => {
  socket.emit();
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("TEST");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const Test = () => {
    return (
      <div className="App">
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>

        <button onClick={sendMessage}> Send Message</button>
        <h1> Message:</h1>
        {messageReceived}
      </div>
    );
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <Router>
      <HeaderHome />
      <div className={"px-20"}>
        <Test />
        <button>test</button>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Game/:id" element={<Game />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Account/:id" element={<AccountFake />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
