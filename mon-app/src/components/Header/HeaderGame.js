import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const HeaderGame = () => {
  // State pour gérer l'ouverture et la fermeture du modal de connexion
  const [disconnect, setDisconnect] = useState(true);
  const [account, setAccount] = useState({});

  useEffect(() => {
    const fetchAccount = async () => {
        try {
            const response = await fetch('http://localhost:4000/users/games');
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const data = await response.json();
            setAccount(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
  
    fetchAccount();
  }, []);

  const handleLogout = () => {
    // Mettre à jour l'état de disconnect à true
    setDisconnect(false);
  };


  return (
    <header className="bg-transparent fixed w-full flex justify-between items-center py-4 px-6">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Loups Garou</h1>
      </div> 
      <div>
          <a href="http://localhost:3000/join" className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          </a>
        </div>
      <div className="flex items-center">
        {account.name && (
          <div className="mr-4 text-white font-bold bg-clip-border p-2.5 bg-red-600 border-7 rounded-md">
            {account.name}
          </div>
        )}
        <div>
          <a href="http://localhost:3000/" onClick={handleLogout} className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Déconnexion
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderGame;
