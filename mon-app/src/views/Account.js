import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FondAccueil from "../assets/FondAccueil.jpg";

const Account = () => {
    return (
        <div>
            <Header />
            <div
                style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }}
                className="flex justify-center items-center flex-col"
            >
                <div className="m-2">
                    <ButtonComponent route="/Join" text="Rejoindre" />
                </div>
                <div>
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
