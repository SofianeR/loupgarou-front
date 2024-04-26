import React  from "react";

const Action = () => {

    return (
        <div className="bg-neutral-700 p-5 grid grid-cols-2 gap-6 w-full rounded-lg text-center">
            <div className="w-1/2 justify-center items-center">
                <button className="bg-white p-5 w-full rounded-lg">Skip</button>
            </div>
            <div className="w-1/2 justify-center place-items-center">
                <button className="bg-white p-5 w-full rounded-lg">Manger</button>
            </div>
        </div>
    )
    

}

export default Action;