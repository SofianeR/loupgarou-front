import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Home from "./views/Home";
import Join from "./views/Join";
import Game from "./views/Game";
import Create from "./views/Create";
import Account from "./views/Account";

import HeaderHome from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [userSession, setUserSession] = useState(
    localStorage.getItem("user_ref_lpMds")
      ? JSON.parse(localStorage.getItem("user_ref_lpMds"))
      : null
  );

  const setUser = async (token, userId, username) => {
    if (token && userId) {
      localStorage.setItem(
        "user_ref_lpMds",
        JSON.stringify({ token, id: userId, username }),
        {
          expires: 1,
        }
      );

      setUserSession({ token, userId, username });
    } else {
      localStorage.removeItem("user_ref_lpMds");
      setUserSession(null);
    }
  };
  return (
    <Router>
        <HeaderHome setUser={setUser} userSession={userSession} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Join" element={<Join />} />
            <Route path="/Game/:id" element={<Game />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Account/:id" element={<Account />} />
          </Routes>
          <Footer />
    </Router>
  );
};

export default App;
