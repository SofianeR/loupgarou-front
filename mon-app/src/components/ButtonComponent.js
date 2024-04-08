import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ route, text }) => {
  return (
    <Link to={route}>
      <button>{text}</button>
    </Link>
  );
};

export default ButtonComponent;
