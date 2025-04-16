import React, { useState } from "react";

export const PatientGender = ({onNext,onChange}) => {
  const [selectedGender, setSelectedGender] = useState(null);
  console.log("selectedGender", selectedGender);
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    onNext();
    onChange("gender", selectedGender);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <p className="text-lg text-gray-700 mb-4">
          Which gender do you identify with?
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => handleGenderSelect("male")}
            className={`px-6 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${
              selectedGender === "male"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Male
          </button>

          <button
            onClick={() => handleGenderSelect("female")}
            className={`px-6 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${
              selectedGender === "female"
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Female
          </button>

          <button
            onClick={() => handleGenderSelect("other")}
            className={`px-6 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${
              selectedGender === "other"
                ? "bg-purple-500 text-white border-purple-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Other
          </button>
        </div>
        <button
          className={`w-full py-4 text-lg font-semibold rounded-md mt-10 ${
            selectedGender ? "bg-white text-[#2E3192]" : "bg-white/30 text-white"
          }`}
          disabled={!selectedGender}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
