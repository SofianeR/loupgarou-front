import React, { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg";

import RulesModal from "../components/Rules";

import { requestManager } from "../config/requestFunction";
import Modal from "../components/Modal";
import constant from "../config/constant";
import { Navigate, useNavigate } from "react-router-dom";
import { useGlobalStatesContext } from "../shared/context/GlobalStates";
import Chat from "../components/Chat";

const Join = () => {

  const { userSession } = useGlobalStatesContext();

  const [alertMessage, setAlertMessage] = useState("");
  const [listModal, setListModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [statusCreation, setStatusCreation] = useState(false);
  const [list, setList] = useState([]);
  const [password, setPassword] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [gameToJoin, setGameJoin] = useState("");

  const fetchGameList = async () => {
    try {
      const idUser = JSON.parse(localStorage.getItem("user_ref_lpMds")).id;
      const url_server = constant.api.url.concat("/game/").concat(idUser);

      requestManager(url_server, "POST").then((res) => {
        if (res.isSuccess) {
          setList(res.response);
          console.log(list);
        }
      });
    } catch (e) {
      console.log(e.message);
      setAlertMessage(e.message);
    }
  };

  useEffect(() => {
    fetchGameList();
  }, []);

  const [creationStatus, setCreationStatus] = useState(false);
  const navigate = useNavigate();
  const GameItem = ({ status, id, infoPlayer }) => {
    const [itemModal, setItemModal] = useState(false);

    const handleClick = () => {
      if (status === "privé") {
        setItemModal(true);
      }
    };

    const handleJoin = async (statusGame, idGame) => {
      try {
        const idUser = JSON.parse(localStorage.getItem("user_ref_lpMds")).id;
        const url_server = constant.api.url
          .concat("/game/")
          .concat(idUser)
          .concat("/join/")
          .concat(idGame);
        console.log("url handleJoin", url_server);

        const responseUserData = await requestManager(url_server, "POST", {
          private: statusGame,
          password: joinPassword,
        });
        console.log("handleJoin", responseUserData);
        if (responseUserData.isSuccess) {
          navigate(`/game/${responseUserData.response.game_id}`);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    return (
      <>
        <li

          onClick={() => handleClick()}
          className="bg-gray-200 p-1 px-2 flex justify-between"

        >
          <p>
            <span className="idgame">
              {id ? "game #".concat(id) : "game #01"}
            </span>
            <span>/ Status {status ? status : "(privé/public)"}</span>
          </p>
          <span>
            {infoPlayer ? infoPlayer.toString().concat("/12") : "0/12"}
          </span>
        </li>
        <Modal
          openModal={itemModal}
          setOpenModal={setItemModal}
          title={"Mot de passe"}
          description={
            "La partie est privé veuillez renseignez le mot de passe!"
          }
          children={
            <>
              <input
                onChange={(v) => setJoinPassword(v.target.value)}
                type={"password"}
                className={"bg-gray-200"}
                placeholder={"mot de passe"}
              />

              <button onClick={() => handleJoin("item.private", "item._id")}>
                submit
              </button>
            </>
          }
        />
      </>
    );
  };

  const handleCreation = async () => {
    try {
      const idUser = JSON.parse(localStorage.getItem("user_ref_lpMds")).id;
      const url_server = constant.api.url
        .concat("/game/")
        .concat(idUser)
        .concat("/create");

      const responseUserData = await requestManager(url_server, "POST", {
        private: statusCreation,
        password: password,
        idUser: userSession.id,

      });
      console.log("handleCreation", responseUserData);
      if (responseUserData.isSuccess) {
        navigate(`/game/${responseUserData.response.game_id}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{ backgroundImage: `url(${FondAccueil})`, height: "100vh" }}
          className="flex justify-center items-center flex-col"
        >
          <div className="m-2">
            <button
              onClick={() => setListModal(true)}
              className="bg-neutral-700 hover:bg-red-600 text-white text-3xl font-bold py-6 px-8 rounded-xl"
            >
              Jouer
            </button>
          </div>

          <div className="fixed top-1/4 left-10 w-1/4 z-50">
          <Chat room={"Générale"} username={userSession?.username} />
          </div>

          <Modal
            openModal={listModal}
            setOpenModal={setListModal}
            title="Liste des serveurs"
            description={
              alertMessage.length > 2 && (
                <p className="text-medium text-red-800 font-bold text-center my-3">
                  {alertMessage}
                </p>
              )
            }
            children={

              <div className="min-h-[500px] flex justify-between flex-col">

                <div>
                  <ul className="w-full flex flex-col gap-2">
                    {list.map((item) => {
                      return (
                        <GameItem
                          key={item._id}
                          id={item._id}
                          status={item.private ? "privé" : "public"}
                          infoPlayer={item.id_users.length}
                        />
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <button
                    onClick={() => setCreateModal(true)}
                    type={"button"}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                  >
                    Crée partie
                  </button>

                  <Modal
                    openModal={createModal}
                    setOpenModal={setCreateModal}
                    title="Création d'une partie"
                    description=""
                    children={
                      <>
                        <>
                          {statusCreation && (
                            <div className="mb-6">
                              <label
                                htmlFor="confirm_password"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                              >
                                Confirm password
                              </label>
                              <input
                                type="password"
                                id="confirm_password"
                                onChange={(v) => setPassword(v.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="•••••••••"
                                required
                              />
                            </div>
                          )}
                          <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                              <input
                                onClick={() =>
                                  setStatusCreation(!statusCreation)
                                }
                                id="remember"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                required
                              />
                            </div>
                            <label
                              htmlFor="remember"
                              className="ms-2 text-sm font-medium"
                            >
                              You want create a private game ?
                            </label>
                          </div>
                          <button
                            onClick={() => handleCreation()}
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                          >
                            Submit
                          </button>
                        </>
                      </>
                    }
                  />
                </div>

              </div>

            }
          />
          <div>
            <RulesModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
