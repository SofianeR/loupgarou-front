import React, { useState, useEffect } from "react";

const BlocPlayers = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/games');
                if (!response.ok) {
                    throw new Error('Failed to fetch Players');
                }
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching Players:', error);
            }
        };
      
        fetchPlayers();
      }, []);

   
      return (
        <div className="grid grid-cols-4 gap-4 bg-neutral-700 p-8 rounded-lg h-95">
            {players.map((player, index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
                    <div className="text-lg font-bold mb-2">{player.name}</div>
                    {/* Autres informations sur le joueur */}
                </div>
            ))}
            {/* Placeholder pour les joueurs manquants */}
            {Array.from({ length: 12 - players.length }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center opacity-50">
                    <div className="text-lg font-bold mb-2">-</div>
                    <div className="text-sm text-gray-500">-</div>
                </div>
            ))}
        </div>
    );
};

export default BlocPlayers;
