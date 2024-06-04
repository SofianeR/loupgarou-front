import React from "react";

import { useGlobalStatesContext } from "../../shared/context/GlobalStates";

const WaitingModal = ({
  openModal,
  setOpenModal,
  title,
  players,
  isHost,
  startGame,
  gameData,
}) => {
  const { userSession } = useGlobalStatesContext();
  return (
    openModal && (
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-200 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg container px-4 max-w-md lg:max-w-xl">
          <div className="flex justify-between pt-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button
              className="text-gray-700 text-2xl"
              onClick={() => setOpenModal(false)}>
              &times;
            </button>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold">Players:</h2>

              <ul>
                {players.map((player, index) => {
                  return (
                    <li key={index} className="text-lg">
                      {player.username}
                    </li>
                  );
                })}
              </ul>
            </div>

            {userSession.id === gameData.host["_id"] && players.length >= 6 && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={startGame}>
                Start Game
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default WaitingModal;
