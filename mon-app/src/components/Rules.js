import React, { useState } from 'react';
import Modal from "./Modal";

const RulesModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = 2; // Nombre total de pages

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const renderPageContent = (page) => {
    switch (page) {
      case 1:
        return (
          <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Rôles dans le jeu des Loups-Garous</h3>
            <div className="mt-2">
              <p>Loup-Garou : Les Loups-Garous se réveillent la nuit pour éliminer un Villageois.</p>
              <p>Villageois : Les Villageois tentent de découvrir et d'éliminer les Loups-Garous.</p>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Comment gagner</h3>
            <div className="mt-2">
              <p>Les Loups-Garous gagnent si le nombre de Loups-Garous est égal ou supérieur au nombre de Villageois.</p>
              <p>Les Villageois gagnent si tous les Loups-Garous sont éliminés.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button 
        className="bg-neutral-700 hover:bg-red-600 text-white text-3xl font-bold py-6 px-8 rounded-xl"
        onClick={handleShow}
      >
        REGLES
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


          </div>
        </div>
      )}

        <Modal
            openModal={showModal}
            setOpenModal={setShowModal}
            children={
                <>
                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${currentPage === 1 ? 'hidden' : ''}`}
                            onClick={prevPage}
                        >
                            Précédent
                        </button>
                        <button
                            type="button"
                            className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${currentPage === maxPages ? 'hidden' : ''}`}
                            onClick={nextPage}
                        >
                            Suivant
                        </button>
                    </div>
                </>
            }
            title={"Règles du lou garou"}
            description={<div className="pt-4">
                {renderPageContent(currentPage)}
            </div>}

        />
    </>
  );
};

export default RulesModal;
