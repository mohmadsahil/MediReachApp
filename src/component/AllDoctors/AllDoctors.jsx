import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft, FaSearch, FaMicrophone, FaVideo,
  FaHome, FaChevronDown
} from "react-icons/fa";
import { cities } from "../../Utils/utils";
import { IMAGE } from "../../Images/Image";

const filters = [
  "Now or Later",
  "Video Consult",
  "PLUS",
  "Sort/Filter",
  "In-Clinic Visit",
  "Top Rated",
  "Available Today",
  "Female Doctors"
];

const clinicDoctors = [
  {
    name: "Rainbow Health Care",
    specialty: "1 General Physician",
    experience: "5 - 16 years experience",
    location: "Yelahanka",
    fees: "₹500 - ₹600 Consultation Fees",
    rating: "98%",
    stories: "790 Patient Stories",
    image: IMAGE.docimage
  }
];

const videoDoctors = [
  {
    name: "Dr. Ravishankar Reddy C R",
    specialty: "General Physician",
    experience: "32 yrs of exp. overall",
    interest: "Special interest in Diabetology",
    location: " Marvel Multispeciality Hospital • Koramangala 1 block ",
    fees: "₹700 Consultation Fees",
    rating: "87%",
    stories: "969 Patient Stories",
    image: IMAGE.docimage
  }
];

const AllDoctors = () => {
  const [activeTab, setActiveTab] = useState("clinic");
  const navigate = useNavigate();
  const doctorData = activeTab === "clinic" ? clinicDoctors : videoDoctors;
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-white text-blue-900 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <a href="/">
          <FaChevronLeft className="text-2xl" />
        </a>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-lg font-semibold"
          >
            {selectedCity}
            <FaChevronDown className="text-sm mt-1" />
          </button>

          {dropdownOpen && (
            <ul className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border rounded-md shadow-md min-w-[150px] max-w-[90vw] z-20">
              {cities.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="px-4 mt-2">
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="General physician"
            className="w-full bg-transparent placeholder-gray-500 outline-none text-black"
          />
          <FaMicrophone className="text-gray-500" />
        </div>
      </div>

      <div className="flex px-4 mt-4">
        <button
          onClick={() => setActiveTab("clinic")}
          className={`flex-1 text-sm text-[12px] font-semibold py-2 px-2 rounded-l-lg flex flex-col items-center ${activeTab === "clinic" ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-700"
            }`}
        >
          <FaHome />
          In-Clinic Appointment
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 text-sm text-[12px] font-semibold py-2 px-2 rounded-r-lg flex flex-col items-center ${activeTab === "video" ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-700"
            }`}
        >
          <FaVideo />
          Video Consultation
        </button>
      </div>

      <div className="flex space-x-2 px-4 mt-3 overflow-x-auto scrollbar-hide">
        {filters.map((item, idx) => (
          <button
            key={idx}
            className="bg-gray-100 px-2 py-2 rounded-full text-sm whitespace-nowrap mb-1"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="px-2 mt-4 space-y-6 mb-25">
        {doctorData.map((doc, idx) => (
          <div
            key={idx}
            onClick={() => navigate("/doctors-info", { state: { doctor: doc } })}
            className="cursor-pointer flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="text-blue-800 font-semibold">{doc.name}</p>
              <p className="text-gray-700 text-sm">{doc.specialty}</p>
              <p className="text-gray-500 text-xs">{doc.experience}</p>
              <p className="text-gray-600 text-sm">{doc.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
