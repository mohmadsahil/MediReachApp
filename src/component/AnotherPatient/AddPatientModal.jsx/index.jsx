import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import {
  addNewPatient,
  updateNewPatient,
  useGetAllAddedPatients,
} from "../../../hooks/usePatientServices";
import { getToken } from "../../../Utils/initToken";

export const AddPatientModal = ({
  addPatientModal,
  setAddPatientModal,
  selectedPatient,
}) => {
  if (!addPatientModal) return null;

  const { patientId } = getToken();
  const getSelectPatientId = selectedPatient?.patientId;
  const { mutate: addNewPatientData } = addNewPatient();
  const { mutate: updateNewPatientData } = updateNewPatient(getSelectPatientId);
  const { refetch } = useGetAllAddedPatients({ patientId });
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    createdBy: patientId,
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        fullName: selectedPatient.fullName || "",
        gender: selectedPatient.gender || "",
        email: selectedPatient.email || "",
        phone: selectedPatient.phone || "",
        dob: selectedPatient.dob || "",
        patientId: selectedPatient.patientId || "",
        createdBy: selectedPatient.createdBy,
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = () => {
    const payload = {
      phone: formData.phone,
      fullName: formData.fullName,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      createdBy: formData.createdBy,
    };

    if (selectedPatient && selectedPatient?.patientId) {
      updateNewPatientData(payload, {
        onSuccess: () => {
          console.log("patient has been updated successfully");
          setAddPatientModal(false);
          refetch()
        },
        onError: (error) => {
          console.error("Cancel failed", error);
        },
      });
    } else {
      addNewPatientData(payload, {
        onSuccess: () => {
          console.log("New patient has been added successfully");
          setAddPatientModal(false);
          refetch()
        },
        onError: (error) => {
          console.error("Cancel failed", error);
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-500">
      <div
        className={`bg-white rounded-xl w-[350px] shadow-lg p-5 relative transform transition-all duration-300 h-[80%] overflow-auto ${
          addPatientModal ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedPatient ? "Edit Patient" : "Add New Patient"}
          </h2>
          <button
            onClick={() => setAddPatientModal(false)}
            className="text-2xl font-bold text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 p-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email ID"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Date Of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit button (Optional if you want) */}
          <button
            onClick={handleAddressSubmit}
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {selectedPatient ? "Update Patient" : "Add Patient"}
          </button>
        </div>
      </div>
    </div>
  );
};
