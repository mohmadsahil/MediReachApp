import React, { useState } from 'react';

export const PatientEmail = ({ onSkip, onNext,onChange }) => {
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
      <div className="flex justify-end">
        <button className="text-sm text-white opacity-70" onClick={onSkip}>
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-2">Hi</h1>
        <h2 className="text-2xl font-semibold">What is your email address?</h2>

        {/* Email input */}
        <div className="mt-10">
          <label htmlFor="email" className="block text-white text-opacity-50 mb-1 text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border-b-2 bg-transparent border-white focus:outline-none text-white placeholder:text-white placeholder:opacity-50 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Next button */}
      <button
        className={`w-full py-4 text-lg font-semibold rounded-md mt-10 ${
          isValidEmail ? 'bg-white text-[#2E3192]' : 'bg-white/30 text-white'
        }`}
        disabled={!isValidEmail}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

