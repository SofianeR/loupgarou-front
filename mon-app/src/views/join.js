import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import HeaderAccount from "../components/Header/HeaderAccount";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg";
import ViewGames from "../components/ViewGames";

const Account = () => {
    return (
        <div>
            <HeaderAccount />
            <div
                style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }}
                className="flex justify-center items-center flex-col"
            >
                <div className="m-2 text-white text-2xl">
                    Liste des serveurs 
                </div>
                <div>
                <ViewGames />
                </div>
                <div>
                <ButtonComponent route="/Rules" text="Rejoindre" />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Account;
