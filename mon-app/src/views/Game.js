import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg"; // Assurez-vous d'avoir le bon chemin d'accès à votre image
import Timer from "../components/Game/Timer";
import BlocPlayers from "../components/Game/BlocPlayers";
import Action from "../components/Game/Actions";

import { roleAttributionFunction } from "../components/Game/GameMechanics";

import { useGlobalStatesContext } from "../shared/context/GlobalStates";
import Chat from "../components/Chat";

const GameFetch = {
  host: "134134134",
  id_users: [
    { _id: "66264a9da65cc64ed5aef47e", username: "permier" },
    { _id: "66264db4b9e77ad6e02158d7", username: "deux" },
    { _id: "66264db4b9e77ad6e02158d7", username: "rtroi" },
    { _id: "66264db4b9e77ad6e02158d7", username: "quatr" },
    { _id: "66264db4b9e77ad6e02158d7", username: "cin" },
    { _id: "66264db4b9e77ad6e02158d7", username: "sixx" },
    { _id: "66264db4b9e77ad6e02158d7", username: "cin" },
    { _id: "66264db4b9e77ad6e02158d7", username: "sixx" },
    { _id: "66264db4b9e77ad6e02158d7", username: "cin" },
    { _id: "66264db4b9e77ad6e02158d7", username: "sixx" },
    { _id: "66264db4b9e77ad6e02158d7", username: "sixx" },
    { _id: "66264db4b9e77ad6e02158d7", username: "sixx" },
  ],
};

const Game = () => {
  const { userSession } = useGlobalStatesContext();

  const [players, setPlayers] = useState(GameFetch["id_users"]);
  const [waitingModal, setWaitingModal] = useState(true);
  const [phase, setPhase] = useState("Jour");
  const [selectedPlayer, setSelectedPlayer] = useState();

  useEffect(() => {
    roleAttributionFunction(players, setPlayers);
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${FondAccueil})`, height: "100vh" }}
      className="flex justify-center items-center flex-col p-8">
      <div className="w-10/12 pt-20">
        <button onClick={() => console.log(players)}>conosole</button>

        <Timer
          players={players}
          setPlayers={setPlayers}
          userSession={userSession}
          waitingModal={waitingModal}
          phase={phase}
          setPhase={setPhase}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
        <div className="w-full flex ">
          <div className="w-1/2 p-10">
            <BlocPlayers
              userSession={userSession}
              players={players}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          </div>
          <div className="w-1/2 p-10">
            <Chat />
          </div>
        </div>
        {/* <div className="w-10/12 place-items-center">
            <Action phase={phase} selectedPlayer={selectedPlayer} />
          </div> */}
      </div>
    </div>
  );
};

export default Game;
