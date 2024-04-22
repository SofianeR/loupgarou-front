import React, { useState, useEffect } from "react";

const ViewGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/games');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSelectGame = (gameId) => {
        // Logique pour la sélection du jeu
        console.log("Jeu sélectionné :", gameId);
    };

    const handleJoinGame = (gameId) => {
        // Logique pour rejoindre la partie
        console.log("Rejoindre la partie :", gameId);
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {games.map((game) => (
                <div key={game.id} className="border p-4 rounded-md shadow-md">
                    <div className="text-sm mb-2">
                        <p><span className="font-bold">ID:</span> {game.id}</p>
                        <p><span className="font-bold">Nom:</span> {game.nom}</p>
                        <p><span className="font-bold">Statut:</span> {game.statut}</p>
                        <p><span className="font-bold">Personnage:</span> {game.pers}</p>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => handleSelectGame(game.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sélectionner</button>
                        <button onClick={() => handleJoinGame(game.id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Rejoindre</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewGames;
