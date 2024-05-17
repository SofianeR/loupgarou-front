import React, { useState, useEffect } from "react";

import { useGlobalStatesContext } from "../shared/context/GlobalStates";
import { requestManager } from "../config/requestFunction";

const AccountFake = () => {
  const { userSession, informationMessage, setInformationMessage } =
    useGlobalStatesContext();

  const [isLoading, setIsLoading] = useState(true);
  const [accountInformation, setAccountInformation] = useState();
  const [modaleUpdate, setModaleUpdate] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState("");

  const fetchAccountInformation = async () => {
    try {
      const url_server = "http://localhost:4000/users/fetch";
      const response = await requestManager(url_server, "POST", userSession);
      console.log(response);
      if (response["isSuccess"]) {
        setAccountInformation(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
      setInformationMessage({
        title: "une erreur s'est produite",
        content: error.message,
      });
    }
    setIsLoading(false);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const url_server = "http://localhost:4000/users/update";
      const response = await requestManager(url_server, "POST", dataToUpdate);
      console.log(response);
      if (response.isSuccess) {
        setInformationMessage({
          title: "Succes",
          content: "Vos informations ont bien été modifié",
        });
        setAccountInformation(response.message);
      }
    } catch (error) {
      console.log(error.message);
      setInformationMessage({
        title: "Une erreur s'est produite",
        content: error.message,
      });
    }
    setDataToUpdate({});
  };
  useEffect(() => {
    fetchAccountInformation();
  }, []);
  return (
    <main style={{ paddingTop: "100px" }}>
      {informationMessage && (
        <div>
          <h3>{informationMessage.title}</h3>{" "}
          <p>{informationMessage.content}</p>
        </div>
      )}

      <button
        onClick={() => {
          console.log(accountInformation);
          console.log(Object.keys(accountInformation).length > 0);
        }}>
        Console
      </button>

      <h1>Mes informations personnelles</h1>

      {accountInformation && Object.keys(accountInformation).length > 0 && (
        <div>
          <ul>
            {Object.keys(accountInformation).map((key, index) => {
              if (key !== "_id")
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setModaleUpdate({
                        key: key,
                        value: accountInformation[key],
                      });
                    }}>
                    {accountInformation[key]}
                  </li>
                );
            })}
          </ul>
        </div>
      )}

      {modaleUpdate && (
        <div>
          <form onSubmit={(e) => handleSubmitUpdate(e)}>
            <label htmlFor="update-input">
              Modifier votre {modaleUpdate.key}
            </label>
            <input
              onChange={(e) => {
                setDataToUpdate({
                  id: accountInformation._id,
                  [`${modaleUpdate.key}`]: e.target.value.toLowerCase(),
                });
              }}
              type="text"
              name="update-input"
              placeholder={modaleUpdate.value}
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default AccountFake;
