import React, { useState } from "react";
import { CancelReasonModal } from "./CancelReasonModal";

export const CancelAppoinmentModal = ({ isModalOpen, setIsModalOpen,appoinmentId }) => {
  const [isReasonModal, setIsReasonModal] = useState(false);

  const handleProcees = () => {
    setIsModalOpen(false);
    setIsReasonModal(true);
  };
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-100">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-blue-600 text-xl font-bold"
            >
              ✕
            </button>

            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                alt="Warning"
                className="h-16 w-16"
              />
            </div>

            {/* Text */}
            <div className="text-center mb-8">
              <h2 className="text-lg font-semibold">
                Are you sure you want to
              </h2>
              <h2 className="text-lg font-semibold">cancel this order?</h2>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500"
              >
                DISCARD
              </button>
              <button
                onClick={handleProcees}
                className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-teal-600 relative"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      )}
      <CancelReasonModal
        setIsReasonModal={setIsReasonModal}
        isReasonModal={isReasonModal}
        setIsModalOpen={setIsModalOpen}
        appoinmentId={appoinmentId}
      />
    </>
  );
};
