import React, { useState, useEffect } from "react";

const Timer = () => {
    const [seconds, setSeconds] = useState(90);
    const [isPaused, setIsPaused] = useState(false);
    const [phase, setPhase] = useState("Jour");
    const [story, setStory] = useState("");


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    useEffect(() => {
        const handleTimerEnd = () => {
            if (phase === "Jour") {
                setPhase("Nuit");
            } else {
                setPhase("Jour");
            }
        };

        const handleStory = () => {
            if (phase === "Jour") {
                if (seconds === 90) {
                    setStory("Le village se réveille");
                } else if (seconds === 80) {
                    setStory("Il est temps de voter");
                } else if (seconds === 30) {
                    setStory("Décidez-vous il reste 30 secondes !");
                }
            } else if (phase === "Nuit") {
                if (seconds === 90) {
                    setStory("Le Village se couche");
                } else if (seconds === 10) {
                    setStory("Les loups sont làààààà !!!!");
                } else if (seconds === 10) {
                    setStory("Il reste 10 secondes");
                }
            }
        };

        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else {
                    clearInterval(interval);
                    setSeconds(90); // Reset timer to 90 seconds
                    handleTimerEnd(); // Call handleTimerEnd when timer reaches zero
                }
            }, 1000); // One second interval (1000 milliseconds)
        }

        handleStory();

        return () => clearInterval(interval);
    }, [seconds, isPaused, phase]);

    return (
        <div className="bg-gray-300 flex justify-between items-center w-full h-200 rounded-lg mx-auto">
            {/* Carré à gauche avec le rôle */}
            <div className="bg-white rounded w-48 h-48 flex justify-center items-center">
                <div className="text-black text-2xl">
                    Role
                    {/* {role} */}
                </div>
            </div>

            {/* Au milieu avec phase et story */}
            <div className="bg-white rounded py-4 flex flex-col justify-center items-center">
                <div className="text-black text-2xl">
                    {phase}
                </div>
            </div>
            <div className="bg-white rounded flex flex-col justify-center items-center">
                <div className="text-black text-2xl">
                    {story}
                </div>
            </div>

            {/* Carré à droite avec le timer */}
            <div className="bg-white rounded-md w-48 h-48 flex flex-col justify-center items-center">
                <h2 className="text-4xl my-5">{formatTime(seconds)}</h2>
                <button onClick={handlePause} className="bg-red-600 text-white font-bold py-2 px-4 rounded">
                    {isPaused ? "Reprendre" : "Pause"}
                </button>
            </div>
        </div >
    );
};


export default Timer;
