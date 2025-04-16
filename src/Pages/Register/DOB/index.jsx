import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PatientDOB = ({ onNext, onChange, onClick }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

  const [day, setDay] = useState(14);
  const [month, setMonth] = useState("April");
  const [year, setYear] = useState(1985);
  const navigate = useNavigate();

  const monthIndex = months.indexOf(month) + 1; // 1-based index
  const formattedMonth = monthIndex.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedDOB = `${year}-${formattedMonth}-${formattedDay}`;
 

  const handleNextClick = () => {
    onChange('dob', formattedDOB);
    // onNext();
    // onClick();
  };

  return (
    <div className="min-h-screen bg-[#2B2F8C] flex flex-col justify-center items-center text-white px-4">
      <div className="absolute top-6 text-sm text-white tracking-wide">
        STEP 2/3
      </div>

      <h1 className="text-4xl font-bold mb-2">Great!</h1>
      <p className="text-lg mb-10">When’s your birthday?</p>

      <div className="bg-white rounded-2xl p-6 w-full max-w-md text-black shadow-lg">
        <div className="flex justify-between space-x-4">
          <select
            className="flex-1 py-3 px-2 rounded-lg text-center text-lg bg-gray-100"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            className="flex-1 py-3 px-2 rounded-lg text-center text-lg bg-gray-100"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="flex-1 py-3 px-2 rounded-lg text-center text-lg bg-gray-100"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="mt-10 bg-[#2563eb] hover:bg-blue-700 transition-colors px-10 py-3 rounded-full text-white text-lg font-medium"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};
