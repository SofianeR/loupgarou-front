import React from "react";
import { Link } from "react-router-dom";

const ButtonCreatGame = ({ route, text }) => {
  return (
    <Link to={route}>
      <button>{text}</button>
    </Link>
  );
};

export default ButtonCreatGame;
