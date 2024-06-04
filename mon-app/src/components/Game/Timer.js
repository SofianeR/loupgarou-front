import React, { useState, useEffect } from "react";

import { disqualificationHandle } from "./GameMechanics";

const Timer = ({
  userSession,
  openModal,
  phase,
  setPhase,
  players,
  setPlayers,
  setSelectedPlayer,
  selectedPlayer,
}) => {
  const [seconds, setSeconds] = useState(90);
  const [isPaused, setIsPaused] = useState(openModal ? true : false);
  const [story, setStory] = useState("");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const handleTimerEnd = () => {
      if (phase === "Jour") {
        setPhase("Nuit");
      } else {
        setPhase("Jour");
      }
    };

    const handleStory = () => {
      if (phase === "Jour") {
        if (seconds === 90) {
          setStory("Le village se réveille");
        } else if (seconds === 80) {
          setStory("Il est temps de voter");
        } else if (seconds === 30) {
          setStory("Décidez-vous il reste 30 secondes !");
        }
      } else if (phase === "Nuit") {
        if (seconds === 90) {
          setStory("Le Village se couche");
        } else if (seconds === 80) {
          setStory("Les loups sont làààààà !!!!");
        } else if (seconds === 10) {
          setStory("Il reste 10 secondes");
        }
      }
    };

    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(interval);
          setSeconds(90);
          handleTimerEnd();
        }
      }, 100);
    }

    handleStory();

    return () => clearInterval(interval);
  }, [seconds, isPaused, phase]);

  useEffect(() => {
    disqualificationHandle(
      players,
      setPlayers,
      selectedPlayer,
      setSelectedPlayer
    );
  }, [phase]);

  return (
    <div className="bg-neutral-700 p-5 grid grid-cols-3 gap-6 justify-between items-center w-full h-200 rounded-lg mx-auto text-center">
      {/* Carré à gauche avec le rôle */}
      <div className="bg-white rounded w-36 h-36 col-1 flex justify-center items-center">
        <div className="text-black text-2xl">
          {players.find((elmt) => elmt._id === userSession.id)["role"]}
        </div>
      </div>

      {/* Au milieu avec phase et story */}
      <div className="grid col-1 gap-y-4">
        {/* Phase */}
        <div className="bg-white rounded row-1 py-4 px-8 justify-center items-center">
          <div className="text-black text-2xl">{phase}</div>
        </div>

        {/* Story */}
        <div className="bg-white rounded row-1 py-4 px-8 justify-center items-center">
          <div className="text-black text-2xl">{story}</div>
        </div>
      </div>

      {/* Carré à droite avec le timer */}
      <div className="bg-white rounded-md w-36 h-36 col-1 justify-start place-self-end">
        <h2 className="text-4xl my-5">{formatTime(seconds)}</h2>
        <button
          onClick={handlePause}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded">
          {isPaused ? "Reprendre" : "Pause"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
