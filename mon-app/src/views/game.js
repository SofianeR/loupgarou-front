import React from "react";
import HeaderGame from "../components/Header/HeaderGame";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg"; // Assurez-vous d'avoir le bon chemin d'accès à votre image
import Timer from "../components/Game/Timer";


const Game = () => {
  return (
    <div>
      <HeaderGame />
      <div
        style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }}
        className="flex justify-center items-center flex-col"
      >
        <div className="w-10/12">
            <Timer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Game;
