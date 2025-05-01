import React, { useState } from "react";
import BookSlot from "../DoctorInfo/BookSlot";

export const ReScheduleModal = ({
  isRescheduleModal,
  setRescheduleModal,
  selectedDoctorId,
  appoinmentId,
}) => {
  if (!isRescheduleModal) return null;

  // console.log("appoinmentId123", appoinmentId);
  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-100">
        <div className="bg-white rounded-lg shadow-lg w-[80%] relative">
          <button
            onClick={() => setRescheduleModal(false)}
            className="absolute top-3 right-3 text-blue-600 text-xl font-bold"
          >
            ✕
          </button>
          <BookSlot
            selectedDoctorId={selectedDoctorId}
            appoinmentId={appoinmentId}
            setRescheduleModal={setRescheduleModal}
          />
        </div>
      </div>
    </>
  );
};
