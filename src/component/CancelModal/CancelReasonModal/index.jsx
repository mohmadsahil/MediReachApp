import React, { useState } from "react";
import {
  useCancelAppointmentById,
  useGetAppointmentById,
} from "../../../hooks/usePatientServices";
import ThreeDotLoader from "../../Loder";

export const CancelReasonModal = ({
  isReasonModal,
  setIsReasonModal,
  appoinmentId,
}) => {
  if (!isReasonModal) return null;
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [filter, setFilter] = useState("All");

  const { mutate: cancelAppointment } = useCancelAppointmentById(appoinmentId);

  const { refetch: refetchAppointments } = useGetAppointmentById(
    patientId,
    filter
  );

  const handleCancelAppointment = () => {
    const payload = {
      selectedReason: selectedReason,
      otherReason: otherReason,
    };
    cancelAppointment(payload, {
      onSuccess: () => {
        console.log("Appoinment Cancel Successfully");
        setIsReasonModal(false);
        setTimeout(()=>{
          refetchAppointments();
        },100)
      },
      onError: (error) => {
        console.error("Cancel failed", error);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] relative">
        {/* Close Button */}
        <button
          onClick={() => setIsReasonModal(false)}
          className="absolute top-3 right-3 text-blue-600 text-xl font-bold"
        >
          ✕
        </button>

        {/* Booking ID */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Appoinment ID :<span className="text-red-500">{appoinmentId}</span>
          </label>
        </div>

        {/* Select Reason */}
        <div className="mb-4">
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >
            <option value="">Select Reason For Cancellation</option>
            <option value="Changed my mind">Changed my mind</option>
            <option value="Found a better price">Found a better price</option>
            <option value="Order delayed">Order delayed</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            Could You Tell Us A Reason For Canceling?
          </label>
          <textarea
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Tell Us more (Optional)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 min-h-[100px]"
          />
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => handleCancelAppointment(appoinmentId)}
          disabled={!selectedReason}
          className={`w-full py-2 rounded-md font-semibold ${
            selectedReason
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};
