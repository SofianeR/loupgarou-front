import React from "react";
// import ButtonComponent from "../components/ButtonComponent";
import FondAccueil from "../assets/FondAccueil.jpg";
import HeaderHome from "../components/Header/HeaderHome";
import Footer from "../components/Footer";
import RulesModal from "../components/Rules";

const Home = () => {
  return (
    <div>

      <HeaderHome />
      <div style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }} className="flex justify-center items-center flex-col">
        <h1 className="text-white text-8xl font-bold mb-8">LOUPS GAROU ONLINE</h1>
        <RulesModal />
      </div>
    </div>
  );
};

export default Home;
