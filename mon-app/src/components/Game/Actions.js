import React from "react";

const Action = ({ phase, selectedPlayer }) => {
  return (
    <div className="bg-neutral-700 p-5 grid grid-cols-2 gap-6 w-full rounded-lg text-center">
      <div className="w-1/2 justify-center items-center"></div>
      <div className="w-1/2 justify-center place-items-center">
        {phase === "Jour" ? (
          <button
            disabled={!selectedPlayer && true}
            className="bg-white p-5 w-full rounded-lg">
            Voter
          </button>
        ) : (
          <button className="bg-white p-5 w-full rounded-lg">Manger</button>
        )}
      </div>
    </div>
  );
};

export default Action;
