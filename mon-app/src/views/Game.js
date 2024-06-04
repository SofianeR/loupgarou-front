import React, { useEffect, useState } from "react";
import FondAccueil from "../assets/FondAccueil.jpg"; // Assurez-vous d'avoir le bon chemin d'accès à votre image
import Timer from "../components/Game/Timer";
import BlocPlayers from "../components/Game/BlocPlayers";
import Action from "../components/Game/Actions";

import WaitingModal from "../components/Game/WaitingModal";

import { requestManager } from "../config/requestFunction";
import { useLocation } from "react-router-dom";

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
  const { informationMessage, setInformationMessage, userSession } =
    useGlobalStatesContext();

  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const gameID = pathname.split("/")[2];

  const [players, setPlayers] = useState(GameFetch["id_users"]);
  const [phase, setPhase] = useState("Jour");
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [gameData, setGameData] = useState(false);

  const fetchGameData = async () => {
    try {
      const url_server = `http://localhost:4000/game/${userSession.id}`;
      const response = await requestManager(url_server, "POST", {
        idGame: gameID,
      });

      if (response.isSuccess) {
        roleAttributionFunction(response.response.id_users, setPlayers);
        setGameData(response.response);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setInformationMessage({
        title: "Erreur récupération partie",
        content: error.message,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGameData();
    setOpenModal(true);
  }, []);

  const startGame = () => {
    alert("Game Started!");
    setOpenModal(false);
  };

  if (isLoading) return <div>En cours de chargement ...</div>;
  return (
    <div
      style={{ backgroundImage: `url(${FondAccueil})`, height: "100vh" }}
      className="flex justify-center items-center flex-col p-8">
      <WaitingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Game Lobby"
        players={players}
        startGame={startGame}
        gameData={gameData}
      />
      <div className="w-10/12 pt-20">
        <button onClick={() => console.log(players)}>conosole</button>

        <Timer
          players={players}
          setPlayers={setPlayers}
          userSession={userSession}
          openModal={openModal}
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
              phase={phase}
            />
          </div>
          <div className="w-1/2 p-10">
            <Chat room={gameID} username={userSession?.username} />
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
