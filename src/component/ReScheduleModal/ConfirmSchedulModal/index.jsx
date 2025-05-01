import React, { useState } from "react";
import { formatDate, formatTime } from "../../../Utils/utils";
import {
  useGetAppointmentById,
  useRescheduleAppointmentById,
} from "../../../hooks/usePatientServices";

export const ConfirmScheduleModal = ({
  scheduleModal,
  setScheduleModal,
  selectedSlot,
  date,
  appoinmentId,
  setRescheduleModal,
}) => {
  const [filter, setFilter] = useState("All");
  const { mutate: rescheduleAppointment } =
    useRescheduleAppointmentById(appoinmentId);

  const {
    data: appoinmentData,
    isLoading: appoinmentDataLoading,
    refetch,
  } = useGetAppointmentById(patientId, filter);

  const handleRescheduleAppointment = () => {
    const payload = {
      newTime: selectedSlot,
      newDate: date,
    };
    rescheduleAppointment(payload, {
      onSuccess: () => {
        console.log("Appoinment Reschedule Successfully");
        setScheduleModal(false);
        setRescheduleModal(false);
        refetch();
      },
      onError: (error) => {
        console.error("Cancel failed", error);
      },
    });
  };

  // console.log("########",scheduleModal)
  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-100">
        <div className="bg-white rounded-lg shadow-lg p-4 w-[80%] relative">
          {/* Close Button */}
          <button
            onClick={() => setScheduleModal(false)}
            className="absolute top-3 right-3 text-blue-600 text-xl font-bold"
          >
            ✕
          </button>

          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
              alt="Warning"
              className="h-10 w-10"
            />
          </div>

          {/* Text */}
          <div className="text-center mb-4">
            {/* <h2 className="text-lg font-semibold">
                Are you sure you want to
              </h2> */}
            <h2 className="text-md font-semibold">
              Do you want to reschedule this appoinment?
            </h2>
          </div>
          <span className="flex items-center justify-center mb-4">
            {/* <p>New Appoinment :</p> */}
            <h2 className="text-md font-semibold">
              {formatDate(date)}
              {" - "}
              {formatTime(selectedSlot)}
            </h2>
          </span>
          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setScheduleModal(false)}
              className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500"
            >
              DISCARD
            </button>
            <button
              onClick={() => handleRescheduleAppointment(appoinmentId)}
              className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-teal-600 relative"
            >
              PROCEED
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
