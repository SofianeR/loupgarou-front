import React, { useState, useEffect } from "react";

const BlocPlayers = ({
  players,
  selectedPlayer,
  setSelectedPlayer,
  userSession,
}) => {
  //   useEffect(() => {
  //     const fetchPlayers = async () => {
  //       try {
  //         const response = await fetch("http://localhost:4000/users/games");
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch Players");
  //         }
  //         const data = await response.json();
  //         // setPlayers(data);
  //       } catch (error) {
  //         console.error("Error fetching Players:", error);
  //       }
  //     };

  //     fetchPlayers();
  //   }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 bg-neutral-700 p-8 rounded-lg h-95">
        {players.map((player, index) => (
          <div
            onClick={() => {
              if (!player["isDisqualified"]) {
                setSelectedPlayer(player);
              }
            }}
            key={index}
            className={`rounded-lg p-4 flex flex-col justify-center items-center  ${
              player === selectedPlayer && "border-2 border-red-800"
            } ${
              player["isDisqualified"]
                ? "bg-gray-800 text-white"
                : "bg-gray-200 hover:cursor-pointer"
            }`}>
            <div className="text-lg font-bold mb-2">{player.username}</div>
            {/* Autres informations sur le joueur */}
            {players.find((elmt) => elmt._id === userSession.id)["role"] ==
              "loup" && (
              <div className="text-lg font-bold mb-2">
                {player.role === "loup" && player.role}
              </div>
            )}
          </div>
        ))}

        {/* Placeholder pour les joueurs manquants */}
        {/* {Array.from({ length: 12 - players.length }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center opacity-50">
          <div className="text-lg font-bold mb-2">-</div>
          <div className="text-sm text-gray-500">-</div>
          <h1>jeejorieajr</h1>
        </div>
      ))} */}
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={() => setSelectedPlayer()}
          className={`bg-white w-full p-5 rounded-lg my-5 ${
            !selectedPlayer && "border-2 border-red-800"
          }`}>
          Skip
        </button>
      </div>
    </>
  );
};

export default BlocPlayers;
