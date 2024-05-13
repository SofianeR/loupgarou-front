import React from 'react';

const Modal = ({ openModal, setOpenModal, title, description, children}) => {
    return ( openModal &&
            <div
                className="fixed inset-0 z-50 overflow-auto bg-gray-200 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg container px-4 max-w-md lg:max-w-xl">
                    <div className="flex justify-between pt-4">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <button className="text-gray-700 text-2xl" onClick={() => setOpenModal(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="py-4 flex flex-col gap-4">
                        {description && description}
                        {children && children}
                    </div>
                </div>
            </div>
    );
};

export default Modal;
