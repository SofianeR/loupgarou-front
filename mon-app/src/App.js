import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Join from "./views/Join";
import Game from "./views/Game";
import Create from "./views/Create";
import Account from "./views/Account";
import Rules from "./views/Rules";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Game/:id" element={<Game />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Rules" element={<Rules />} />
      </Routes>
    </Router>
  );
};

export default App;
