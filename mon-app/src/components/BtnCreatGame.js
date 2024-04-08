import React from 'react';
import { Link } from 'react-router-dom';

const ButtonCreatGame = () => {
  return (
    <Link to="/Create">
      <button>Créer une partie</button>
    </Link>
  );
};

export default ButtonCreatGame;
