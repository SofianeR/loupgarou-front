import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import FondAccueil from "../assets/FondAccueil.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = ({ }) => {

  return (
    <div>
      <Header />
      <div style={{ backgroundImage: `url(${FondAccueil})`, height: "900px" }} className="flex justify-center items-center flex-col">
        <h1 className="text-white text-8xl font-bold mb-8">LOUPS GAROU ONLINE</h1>
        <ButtonComponent route="/Rules" text="Règles" />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
