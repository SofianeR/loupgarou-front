import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { requestManager } from "../config/requestFunction";

function BtnModalLogin({ setOpenModal, setUser }) {
  const navigate = useNavigate();
  // State pour gérer les valeurs du formulaire
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Vous pouvez gérer ici la soumission du formulaire, par exemple, envoyer les données au backend
    // console.log("username:", username);
    // console.log("Password:", password);

    try {
      const url_server = "http://localhost:4000/users/signin";
      const signinResponse = await requestManager(url_server, "POST", {
        username,
        password,
      });

      if (signinResponse["isSuccess"]) {
        // Fermer le modal après la soumission du formulaire
        navigate(`/account/${signinResponse["data"]["id"]}`);
        setUser(
          signinResponse["data"]["token"],
          signinResponse["data"]["id"],
          signinResponse["data"]["username"]
        );
        setOpenModal(false);
      } else {
        throw new Error(signinResponse.message);
      }
    } catch (error) {
      console.log("dans le catch");
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-200 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end">
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setOpenModal(false)}>
            &times;
          </button>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Connexion</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="username"
              className="mt-1 p-2 border rounded-md w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              className="mt-1 p-2 border rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="px-4 py-2 mr-4 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setOpenModal(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BtnModalLogin;
