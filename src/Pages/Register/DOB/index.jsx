import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const PatientDOB = ({ onNext, onChange, onClick, onPrev }) => {
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
    <div className="flex flex-col justify-between h-screen bg-[#2B2F8C] px-6 py-8 text-white">
      {/* Header with arrow at top left */}
      <div className="flex justify-between">
        <button className="text-sm text-white opacity-70" onClick={onPrev}>
          <FaArrowLeft/>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Great!</h1>
        <p className="text-xl mb-10">When's your birthday?</p>

        <div className="bg-white rounded-2xl p-[10px] w-full max-w-md text-black shadow-lg">
          <div className="flex justify-center space-x-4 overflow-visible">
            <div className="flex-1 relative">
              <select
                className="w-full py-3 px-2 rounded-lg text-center text-lg "
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <select
                className="w-full py-3 px-2 rounded-lg text-center text-lg "
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <select
                className="w-full py-3 px-2 rounded-lg text-center text-lg "
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
        </div>
      </div>

      {/* Next button */}
      <button
        className="w-full py-3 bg-[#6A6FE9] text-white text-lg font-semibold rounded-md transition-colors duration-300"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};