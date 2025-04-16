import React, { useState } from "react";

export default function PatientName({ onNext, onChange }) {
  const [name, setName] = useState("");

  console.log("Name", name);
  const [offersAccepted, setOffersAccepted] = useState(true);

  const handleNext = () => {
    onNext();
    onChange("fullName", name);
  };
  return (
    <div className="min-h-screen bg-[#2B2F84] flex flex-col justify-between p-6 pt-10">
      <div>
        <p className="text-white text-xl font-semibold mb-2">Hi</p>
        <h1 className="text-white text-2xl font-bold mb-6">
          What's your name?
        </h1>

        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-white bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none pb-2"
        />
      </div>

      <div className="space-y-6">
        <label className="flex items-center text-white text-sm">
          <input
            type="checkbox"
            checked={offersAccepted}
            onChange={() => setOffersAccepted(!offersAccepted)}
            className="form-checkbox h-5 w-5 text-blue-500 mr-3 rounded"
          />
          Receive relevant offers and promotional communication from MediReach
        </label>

        <button
          className={`w-full py-3 rounded-md text-white text-lg font-semibold transition duration-200 ${
            name ? "bg-[#6A6FE9]" : "bg-[#6A6FE9]/50 cursor-not-allowed"
          }`}
          disabled={!name}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
