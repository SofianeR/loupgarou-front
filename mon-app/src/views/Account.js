import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import HeaderAccount from "../components/Header/HeaderAccount";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg";
import RulesModal from "../components/Rules";

const Account = () => {
    return (
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
        </div>
    );
};

export default Account;
