import React from "react";
import { MdDone } from "react-icons/md";

export const ThankYouModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-100">
      <div className="">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 relative w-80 text-center">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 rounded-full p-3">
                <MdDone className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Content */}
            <h2 className="mt-8 text-2xl font-semibold text-gray-800">
              Thank You!
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Your appoinment has been booked successfully. Thanks!
            </p>

            {/* OK Button */}
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow-md"
              onClick={onConfirm}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
