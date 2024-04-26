import React, { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import HeaderAccount from "../components/Header/HeaderAccount";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg";

import RulesModal from "../components/Rules";

import { requestManager } from "../config/requestFunction";


const Account = () => {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const url_server = "http://localhost:4000/users/fetch/single";
      const responseUserData = await requestManager(url_server, "POST");
      console.log(responseUserData);
    } catch (error) {
      console.log(error.message);
      setAlertMessage(error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }}
        className="flex justify-center items-center flex-col">
        <div classNdame="m-2">
          <ButtonComponent route="/Join" text="Rejoindre" />
        </div>
        <div>

            <HeaderAccount />
            <div
                style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }}
                className="flex justify-center items-center flex-col"
            >
                <div className="m-2">
                    <ButtonComponent route="/Join" text="REJOINDRE" />
                </div>
                <div>
                <RulesModal />

                </div>
            </div>
            <div>
                <Footer />
            </div>

          <ButtonComponent route="/Rules" text="Règles" />

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;
