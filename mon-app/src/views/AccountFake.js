import React, { useState, useEffect } from "react";

import { useGlobalStatesContext } from "../shared/context/GlobalStates";
import { requestManager } from "../config/requestFunction";

const AccountFake = () => {
  const { userSession, informationMessage, setInformationMessage } =
    useGlobalStatesContext();

  const [isLoading, setIsLoading] = useState(true);

  const [accountInformation, setAccountInformation] = useState();

  const fetchAccountInformation = async () => {
    try {
      const url_server = "http://localhost:4000/users/fetch";
      const response = await requestManager(url_server, "POST", "123");
      console.log(response);
    } catch (error) {
      console.log(error.message);
      setInformationMessage({
        title: "une erreur s'est produite",
        content: error.message,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAccountInformation();
  }, []);
  return <main></main>;
};

export default AccountFake;
