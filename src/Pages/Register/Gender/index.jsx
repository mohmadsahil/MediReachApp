import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const PatientGender = ({ onNext, onChange, onSkip, onPrev }) => {
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
    <div className="flex flex-col justify-between h-screen bg-[#2E3192] px-6 py-8 text-white">
      {/* Header */}
      <div className="flex justify-start">
        <button className="text-sm text-white opacity-70" onClick={onPrev}>
          <FaArrowLeft/>
        </button>
      </div>

      {/* Content */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-2">Hi</h1>
        <h2 className="text-2xl font-semibold">Which gender do you identify with?</h2>

        {/* Gender selection buttons */}
        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={() => handleGenderSelect("male")}
            className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${selectedGender === "male"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }`}
          >
            Male
          </button>

          <button
            onClick={() => handleGenderSelect("female")}
            className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${selectedGender === "female"
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }`}
          >
            Female
          </button>

          <button
            onClick={() => handleGenderSelect("other")}
            className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-colors ${selectedGender === "other"
                ? "bg-purple-500 text-white border-purple-500"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }`}
          >
            Other
          </button>
        </div>
      </div>

      {/* Next button */}
      <button
        className={`w-full py-3 text-lg font-semibold rounded-md transition-colors duration-300 ${selectedGender
            ? "bg-[#6A6FE9] text-white"
            : "bg-[#6A6FE9]/50 text-white cursor-not-allowed"
          }`}
        disabled={!selectedGender}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};