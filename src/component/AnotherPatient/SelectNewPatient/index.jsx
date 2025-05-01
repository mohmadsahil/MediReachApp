import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { AddPatientModal } from "../AddPatientModal.jsx";
import { calculateAge } from "../../../Utils/utils.js";
import { getToken } from "../../../Utils/initToken.js";

export const SelectNewPatient = ({
  setIsAddressOpen,
  isAddressOpen,
  getAllNewPatient,
  setSelectedPatient,
  selectedPatient,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [addPatientModal, setAddPatientModal] = useState(false);
  const AllAddedPatients = getAllNewPatient?.data?.getAllPatient;
  const { patientId } = getToken();
  // console.log("selectedPatientId", selectedPatientId);

  useEffect(() => {
    if (!selectedPatientId && patientId && AllAddedPatients?.length) {
      const defaultPatient = AllAddedPatients.find(
        (p) => p.patientId === patientId
      );
      if (defaultPatient) {
        setSelectedPatientId(patientId);
        setSelectedPatient(defaultPatient);
      }
    }
  }, [AllAddedPatients, patientId, selectedPatientId]);

  const handleSelect = (id) => {
    setSelectedPatientId(id);
    const patientDetails = AllAddedPatients?.find((p) => p.patientId === id);
    setSelectedPatient(patientDetails);
  };

  const handleContinue = () => {
    if (selectedPatient) {
      console.log("Selected Patient Details:", selectedPatient);
      setIsAddressOpen(false);
    } else {
      console.log("No patient selected.");
    }
  };

  const handlePatientModal = () => {
    setIsAddressOpen(false);
    setAddPatientModal(true);
    if (selectedPatient) {
      setSelectedPatient("");
    }
  };

  const handleEditClick = (id) => {
    const patientDetails = AllAddedPatients?.find((p) => p.patientId === id);
    // setSelectedPatientId(id);
    setSelectedPatient(patientDetails);
    setAddPatientModal(true);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isAddressOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-50 pb-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Select Another Patient
            </h2>
            <button
              onClick={() => setIsAddressOpen(false)}
              className="text-2xl font-bold text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="p-4 space-y-4">
            {/* Add New Patient Button */}
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md shadow-md"
              onClick={handlePatientModal}
            >
              <FiPlus />
              Patient
            </button>

            {/* Patient Cards */}
            {AllAddedPatients?.map((patient) => (
              <div
                key={patient.patientId}
                className={`relative border rounded-lg p-4 bg-blue-50 flex flex-col gap-1 h-[70%] overflow-auto ${
                  selectedPatientId === patient.patientId
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
                // onClick={() => handleSelect(patient.patientId)}
              >
                {/* Radio Button */}
                <div className="absolute top-4 left-4">
                  <input
                    type="radio"
                    name="selectedPatient"
                    checked={
                      selectedPatientId
                        ? selectedPatientId === patient.patientId
                        : patientId === patient.patientId // if no selected yet, match with getToken patientId
                    }
                    onChange={() => handleSelect(patient.patientId)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>

                {/* Edit Icon */}
                <div className="absolute top-4 right-4 text-blue-600 cursor-pointer">
                  <FiEdit2 onClick={() => handleEditClick(patient.patientId)} />
                </div>

                {/* Patient Info */}
                <div className="ml-6">
                  <div className="font-semibold">{patient.fullName}</div>
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <span>
                      {calculateAge(patient?.dob)} Year {"|"}
                    </span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {patient.gender}
                    </span>
                  </div>

                  {patient.email && (
                    <div className="flex items-center">
                      <div className="text-sm text-gray-700">
                        {patient.email}
                        {"  "} |
                      </div>
                      <div className="text-sm text-gray-700">{patient.dob}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md shadow-md w-full"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <AddPatientModal
        addPatientModal={addPatientModal}
        setAddPatientModal={setAddPatientModal}
        selectedPatient={selectedPatient}
      />
      {/* <ConfirmAppoinment selectedPatient={selectedPatient}/> */}
    </>
  );
};
