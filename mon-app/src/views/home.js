import React, { useState } from "react";
import ButtonRules from "../components/BtnRules";
import BtnModalCreaAcc from "../components/BtnModalCreaAcc";
import BtnModalLogin from "../components/BtnModalLogin";

const Home = () => {
  // State pour gérer l'ouverture et la fermeture du modal de création de compte
  const [modalOpenAcc, setModalOpenAcc] = useState(false);

  // State pour gérer l'ouverture et la fermeture du modal de connexion
  const [modalOpenLogin, setModalOpenLogin] = useState(false);

  return (
    <div>
      <h1 className="text-xl">Loups Garou tmtc</h1>
      <div>
        <button onClick={() => setModalOpenAcc(true)}>Créer un compte</button>
        {modalOpenAcc && <BtnModalCreaAcc setOpenModal={setModalOpenAcc} />}
      </div>
      <div>
        <button onClick={() => setModalOpenLogin(true)}>Connexion</button>
        {modalOpenLogin && <BtnModalLogin setOpenModal={setModalOpenLogin} />}
      </div>
      <div>
        <ButtonRules />
      </div>
    </div>
  );
};

export default Home;
