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
import {
  useBookAppoinment,
  useGetAllAddedPatients,
} from "../../../hooks/usePatientServices";
import { getToken } from "../../../Utils/initToken";
import { ThankYouModal } from "../../ThankYouModal";
import {
  formatDate,
  formatTime,
  getFirstLetterCapital,
} from "../../../Utils/utils";
import { SelectNewPatient } from "../../AnotherPatient/SelectNewPatient";

export default function ConfirmAppoinment() {
  const navigate = useNavigate();
  const state = useLocation();
  const bookSelectedSlot = state?.state;
  const doctorInfo = state?.state?.getDoctorData;
  const [selectedPayment, setSelectedPayment] = useState(0);    //0 for clinic and 1 for online
  const [selectedAmount, setSelectedAmount] = useState(
    doctorInfo?.feesPerConsultation || 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const getSelectedPatientId = selectedPatient?.patientId;
  const GetTokenData = getToken();
  const getPatientId = GetTokenData?.patientId;
  const {
    mutate: fetchAllNewPatients,
    data: getAllNewPatient,
    loading: getAllNewPatientLoader,
  } = useGetAllAddedPatients({ patientId: getPatientId });

  const getAllAddedpatientData = getAllNewPatient?.data?.getAllPatient;

  let getDefaultSelectedPatient = null;

  if (Array.isArray(getAllAddedpatientData)) {
    getDefaultSelectedPatient = getAllAddedpatientData.find(
      (item) => item.patientId === getPatientId
    );
  }

  const handlePaymentSelection = (mode) => {
    setSelectedPayment(mode);

    if (mode === 1) {
      setSelectedAmount(110); // Online price fixed
    } else if (mode === 0) {
      setSelectedAmount(doctorInfo?.feesPerConsultation); // Clinic price dynamic
    }
  };

  const {
    mutate: slotBookMutate,
    data: slotBookData,
    isLoading,
    isError,
    error,
  } = useBookAppoinment();

  const handleOpenModal = () => {
    setIsAddressOpen(true);
    // fetchAllNewPatients(getPatientId);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/appoinmets");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const confirmBooking = () => {
    const payload = {
      doctorId: bookSelectedSlot.doctorId,
      time: bookSelectedSlot.slot,
      date: bookSelectedSlot.date,
      patientId: selectedPatient ? getSelectedPatientId : getPatientId,
      createdBy: getPatientId,
      payementAmt:selectedAmount,
      paymentStatus:selectedPayment,
    };

    slotBookMutate(payload, {
      onSuccess: (data) => {
        openModal();
      },
      onError: (err) => {
        console.error("Error confirming booking:", err);
      },
    });
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
            src={doctorInfo?.profileImage}
            alt="Doctor"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{doctorInfo?.fullName}</h2>
            <p className="text-sm text-gray-500">
              {doctorInfo?.specialization}
            </p>
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
            {formatDate(bookSelectedSlot?.date)}{" "}
            {formatTime(bookSelectedSlot?.slot)}
            <span className="text-gray-400"> • in 1 day</span>
          </p>
        </div>

        {/* Clinic Details */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineHome className="w-5 h-5 text-blue-500" />
            <p className="font-medium">Clinic Details</p>
          </div>
          <p className="text-sm mt-1 ml-6 text-gray-600">
            {doctorInfo?.clinicName}
            {" - "}
            {doctorInfo?.clinicAddress}
          </p>
          <p className="text-sm text-purple-600 mt-2 ml-6 font-medium">
            MediReach Promise -{" "}
            <span className="text-gray-600">
              Appointment confirmed within 1h
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
              selectedPayment === 1
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handlePaymentSelection(1)}
          >
            <div className="flex items-center gap-2">
              <HiOutlineCreditCard className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Pay Online</span>
            </div>
            <div className="text-sm font-semibold text-green-600">
              <span className="line-through text-gray-400 mr-1">{`₹${doctorInfo?.feesPerConsultation}`}</span>{" "}
              ₹110
            </div>
          </div>

          {/* Clinic */}
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
              selectedPayment === 0
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handlePaymentSelection(0)}
          >
            <div className="flex items-center gap-2">
              <HiOutlineCurrencyRupee className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Pay At Clinic</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">{`₹${doctorInfo?.feesPerConsultation}`}</div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {getFirstLetterCapital(
                selectedPatient?.fullName || getDefaultSelectedPatient?.fullName
              )}
            </div>
            <div>
              <p className="text-sm text-gray-800">In-Clinic Appointment for</p>
              <p className="font-medium">
                {selectedPatient?.fullName ||
                  getDefaultSelectedPatient?.fullName}
              </p>
            </div>
          </div>
          <button
            className="text-blue-600 font-medium text-sm"
            onClick={handleOpenModal}
          >
            CHANGE
          </button>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-1 text-gray-700">
              <HiOutlineCurrencyRupee className="w-5 h-5 text-gray-600" />
              {/* {console.log("selectedAmount",selectedAmount)} */}
              <span className="text-md">{`${selectedAmount}${"/-"}`}</span>
            </div>
          </div>
          <button
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={confirmBooking}
          >
            Confirm Clinic Visit
          </button>
        </div>
      </div>
      <ThankYouModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <SelectNewPatient
        setIsAddressOpen={setIsAddressOpen}
        isAddressOpen={isAddressOpen}
        getAllNewPatient={getAllNewPatient}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
    </>
  );
}
