import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Home from "./views/Home";
import Join from "./views/Join";
import Game from "./views/Game";
import Create from "./views/Create";
import Account from "./views/Account";
import Rules from "./views/Rules";

const App = () => {
  const [userSession, setUserSession] = useState(
    Cookies.get("user_ref_lpMds")
      ? JSON.parse(Cookies.get("user_ref_lpMds"))
      : null
  );

  const setUser = async (token, userId) => {
    if (token && userId) {
      Cookies.set("user_ref_lpMds", JSON.stringify({ token, userId }), {
        expires: 1,
      });
      setUserSession({ token, userId });
    } else {
      Cookies.remove("user_ref_lpMds");
      setUserSession(null);
    }
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Game/:id" element={<Game />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Account/:id" element={<Account />} />
        <Route path="/Rules" element={<Rules />} />
      </Routes>
    </Router>
  );
};

export default App;
