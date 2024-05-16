import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ route, text }) => {
  return (
    <Link to={route}>
      <button className="bg-neutral-700 hover:bg-red-600 text-white text-3xl font-bold py-6 px-8 rounded-xl">{text}</button>
    </Link>
  );
};

export default ButtonComponent;
