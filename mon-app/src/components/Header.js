import React, { useState } from "react";
import BtnModalCreaAcc from "./BtnModalCreaAcc";
import BtnModalLogin from "./BtnModalLogin";
import logo from "../assets/logo.png";

import { useNavigate, Link, useLocation } from "react-router-dom";
import Modal from "./Modal";

import { useGlobalStatesContext } from "../shared/context/GlobalStates";

const HeaderHome = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userSession, setUser } = useGlobalStatesContext();

  // State pour gérer l'ouverture et la fermeture du modal de création de compte
  const [modalOpenAcc, setModalOpenAcc] = useState(false);
  const [modalTest, setModalTest] = useState(false);

  // State pour gérer l'ouverture et la fermeture du modal de connexion
  const [modalOpenLogin, setModalOpenLogin] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-transparent fixed w-full flex justify-between items-center py-4 px-6">
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="logo" className="h-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Loups Garou</h1>
      </Link>
      {pathname.includes("Game") && (
        <div>
          <a
            href="http://localhost:3000/join"
            className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            QUITTER
          </a>
        </div>
      )}
      {userSession ? (
        <div className="flex items-center">
          {userSession.username && userSession.id && (
            <Link
              to={`/Account/${userSession.id}`}
              className="mr-4 text-white font-bold bg-clip-border p-2.5 bg-red-600 border-7 rounded-md">
              <div>{userSession.username}</div>
            </Link>
          )}
          <div>
            {modalOpenLogin && (
              <BtnModalLogin
                setUser={setUser}
                setOpenModal={setModalOpenLogin}
              />
            )}
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Déconnexion
            </button>
          </div>
        </div>
      ) : (
          <div className="flex items-center">
            <div className="mr-4">
              <button
                  onClick={() => setModalOpenAcc(true)}
                  className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Créer un compte
              </button>
              {modalOpenAcc && (
                  <BtnModalCreaAcc
                      setUser={setUser}
                      openModal={modalOpenAcc}
                      setOpenModal={setModalOpenAcc}
                  />
              )}
            </div>
            <div>
              <button
                  onClick={() => setModalOpenLogin(true)}
                  className="bg-neutral-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Connexion
              </button>
              {modalOpenLogin && (
                  <BtnModalLogin
                      setUser={setUser}
                      openModal={modalOpenLogin}
                      setOpenModal={setModalOpenLogin}
                  />
              )}
            </div>
          </div>
      )}
    </header>
  );
};

export default HeaderHome;
