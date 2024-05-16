import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

import { useGlobalStatesContext } from "../shared/context/GlobalStates";

function BtnModalCreaAcc({ setOpenModal, openModal }) {
  const { setUser } = useGlobalStatesContext();
  
  const navigate = useNavigate();
  // State pour gérer les valeurs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    try {
      // Vous pouvez gérer ici la soumission du formulaire, par exemple, envoyer les données au backend
      // console.log("Email:", email);
      // console.log("Password:", password);

      const url_server = "http://localhost:4000/users/signup";

      const fetchSignupResponse = await fetch(url_server, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const responseSignup = await fetchSignupResponse.json();

      if (responseSignup["isSuccess"]) {
        // Fermer le modal après la soumission du formulaire
        navigate(`/account/${responseSignup["data"]["id"]}`);
        setUser(
          responseSignup["data"]["token"],
          responseSignup["data"]["id"],
          responseSignup["data"]["username"]
        );
        setOpenModal(false);
      } else {
        throw new Error(responseSignup.message);
      }
    } catch (error) {
      console.log(error.message);
      setAlertMessage(error.message);
    }
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Création de compte"
      description={
        alertMessage && (
          <p className="text-medium text-red-800 font-bold text-center my-3">
            {alertMessage}
          </p>
        )
      }
      children={
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 border rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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
              Enregistrement
            </button>
          </div>
        </form>
      }
    />
  );
}

export default BtnModalCreaAcc;
