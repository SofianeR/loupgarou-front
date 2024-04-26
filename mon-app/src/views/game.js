import React from "react";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg"; // Assurez-vous d'avoir le bon chemin d'accès à votre image
import Timer from "../components/Game/Timer";
import BlocPlayers from "../components/Game/BlocPlayers";
import Chat from "../components/Game/Chat";
import Action from "../components/Game/Actions";

const Game = () => {
  return (
    <div>
      {/* <HeaderGame /> */}
      <div
        style={{ backgroundImage: `url(${FondAccueil})`, height: "auto" }}
        className="flex justify-center items-center flex-col p-8">
        <div className="w-10/12 pt-20">
          <Timer />
          <div className="w-full flex ">
            <div className="w-1/2 p-10">
              <BlocPlayers />
            </div>
            <div className="w-1/2 p-10">
              <Chat />
            </div>
          </div>
          <div className="w-10/12 place-items-center">
            <Action />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Game;
