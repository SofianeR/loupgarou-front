import React from 'react';
import ButtonComponent from "../components/ButtonComponent";

const Account = () => {
    return (
        <div>
            <h1 className="text-xl">Loups Garou tmtc</h1>
            <ButtonComponent route="/Join" texte="Rejoindre" />
            <div>
                <ButtonComponent route="/Rules" text="Règles" />
            </div>
        </div>
    );
};


export default Account;