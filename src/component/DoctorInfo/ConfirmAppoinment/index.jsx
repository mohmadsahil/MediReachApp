import React, { useEffect, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineUser,
  HiOutlineReceiptRefund,
  HiOutlineCurrencyRupee,
  HiCheckCircle,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookAppoinment } from "../../../hooks/usePatientServices";
import { getToken } from "../../../Utils/initToken";
import ConfirmModal from "../../ConfirmModal";

export default function ConfirmAppoinment() {
  const [selectedPayment, setSelectedPayment] = useState("clinic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookSelectedSlot = state;

  const {
    mutate: slotBookMutate,
    data: slotBookData,
    isLoading,
    isError,
    error,
  } = useBookAppoinment();

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/appoinmets')
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const confirmBooking = () => {
    slotBookMutate(
      {
        doctorId: bookSelectedSlot.doctorId,
        time: bookSelectedSlot.slot,
        date: bookSelectedSlot.date,
        patientId: getToken(),
      },
      {
        onSuccess: (data) => {
          openModal();
        },
        onError: (err) => {
          console.error("Error confirming booking:", err);
        },
      }
    );
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-md pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <HiOutlineChevronLeft className="w-6 h-6 text-gray-600" />
          <h1 className="text-lg font-semibold">Book In-Clinic Appointment</h1>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 p-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Doctor"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-lg font-semibold">Dr. Chanchal Choudhary</h2>
            <p className="text-sm text-gray-500">Dermatologist</p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-green-600 font-medium">94%</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">110 Patient Stories</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Highly Recommended for Doctor Friendliness
            </p>
          </div>
        </div>

        {/* Appointment Time */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineCalendar className="w-5 h-5 text-blue-500" />
            <p className="font-medium">Appointment time</p>
          </div>
          <p className="text-sm mt-1 ml-6 text-gray-600">
            Thu, 17 Apr 04:00 PM{" "}
            <span className="text-gray-400">• in 1 day</span>
          </p>
        </div>

        {/* Clinic Details */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineHome className="w-5 h-5 text-blue-500" />
            <p className="font-medium">Clinic Details</p>
          </div>
          <p className="text-sm mt-1 ml-6 text-gray-600">
            La Fameux Derma Skin And Hair Clinic, H Number, 5 Block A, Goutham
            Buddha Nagar, Sector 50
          </p>
          <p className="text-sm text-purple-600 mt-2 ml-6 font-medium">
            Practo Promise -{" "}
            <span className="text-gray-600">
              Appointment confirmed instantly
            </span>
          </p>
        </div>

        {/* Payment Mode */}
        <div className="p-4 border-t border-gray-200">
          <p className="font-medium text-gray-800 mb-2">
            Choose a mode of payment
          </p>

          {/* Online */}
          <div
            className={`flex items-center justify-between p-3 border rounded-lg mb-2 cursor-pointer ${
              selectedPayment === "online"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPayment("online")}
          >
            <div className="flex items-center gap-2">
              <HiOutlineCreditCard className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Pay Online</span>
            </div>
            <div className="text-sm font-semibold text-green-600">
              <span className="line-through text-gray-400 mr-1">₹800</span> ₹680
            </div>
          </div>

          {/* Clinic */}
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
              selectedPayment === "clinic"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPayment("clinic")}
          >
            <div className="flex items-center gap-2">
              <HiOutlineCurrencyRupee className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Pay At Clinic</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">₹800</div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
              S
            </div>
            <div>
              <p className="text-sm text-gray-800">In-Clinic Appointment for</p>
              <p className="font-medium">Sahil</p>
            </div>
          </div>
          <button className="text-blue-600 font-medium text-sm">CHANGE</button>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-1 text-gray-700">
              <HiOutlineCurrencyRupee className="w-4 h-4 text-gray-600" />
              <span className="text-sm">800</span>
            </div>
            <button className="text-blue-600 text-xs underline flex items-center gap-1 mt-1">
              <HiOutlineReceiptRefund className="w-4 h-4" /> View Bill
            </button>
          </div>
          <button
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={confirmBooking}
          >
            Confirm Clinic Visit
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
