import React, { useState } from "react";
import BtnModalCreaAcc from "./BtnModalCreaAcc";
import BtnModalLogin from "./BtnModalLogin";
import logo from "../assets/logo.png";

const HeaderHome = () => {
  // State pour gérer l'ouverture et la fermeture du modal de création de compte
  const [modalOpenAcc, setModalOpenAcc] = useState(false);

  // State pour gérer l'ouverture et la fermeture du modal de connexion
  const [modalOpenLogin, setModalOpenLogin] = useState(false);

  return (
    <header className="bg-transparent fixed w-full flex justify-between items-center py-4 px-6">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Loups Garou</h1>
      </div> 
      <div className="flex items-center">
        <div className="mr-4">
          <button onClick={() => setModalOpenAcc(true)} className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Créer un compte
          </button>
          {modalOpenAcc && <BtnModalCreaAcc setOpenModal={setModalOpenAcc} />}
        </div>
        <div>
          <button onClick={() => setModalOpenLogin(true)} className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Connexion
          </button>
          {modalOpenLogin && <BtnModalLogin setOpenModal={setModalOpenLogin} />}
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
