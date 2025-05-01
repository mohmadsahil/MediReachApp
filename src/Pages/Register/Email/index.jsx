import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";

export const PatientEmail = ({ onSkip, onNext, onChange, onPrev }) => {
  const [email, setEmail] = useState('');
  console.log('Email', email);
  const isValidEmail = email.trim() !== '' && /\S+@\S+\.\S+/.test(email);

  const handleNext = () => {
    onNext();
    onChange('email', email);
  }
  return (
    <div className="flex flex-col justify-between h-screen bg-[#2E3192] px-6 py-8 text-white">
      {/* Header */}
      <div className="flex justify-between">
        <button className="text-sm text-white opacity-70" onClick={onPrev}>
          <FaArrowLeft />
        </button>
      </div>

      {/* Content */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">What is your email address?</h2>

        {/* Email input */}
        <div className="mt-10">
          <label htmlFor="email" className="block text-white text-opacity-50 mb-1 text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-white bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none pb-2 autofill:bg-transparent autofill:text-white"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Next button */}
      <button
        className={`w-full py-3 rounded-md text-white text-lg font-semibold transition duration-200 ${isValidEmail ? "bg-[#6A6FE9]" : "bg-[#6A6FE9]/50 cursor-not-allowed"
          }`}
        disabled={!isValidEmail}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

