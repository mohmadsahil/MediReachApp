import React, { useState } from "react";
import {
  FaChevronLeft,
  FaSearch,
  FaCrosshairs,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCurrentLocation } from "../../hooks/useCommonServices";
export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");
  const { data: locationData } = useCurrentLocation({lng,lat});

  console.log("locationData",locationData)
  const recentSearches = ["Sector 19"];
  const topLocalities = [
    "Sector 26",
    "Sector 19",
    "Sector 62",
    "Gaur City",
    "Sector 12",
    "Sector 137",
  ];

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-lg font-semibold"
        >
          {/* {selectedCity} */}
          <FaChevronDown className="text-sm mt-1" />
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-100"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white h-screen w-full px-4 pt-4 overflow-y-auto rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Select Location
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-gray-700"
            >
              &times;
            </button>
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full mb-4 rounded-2xl px-4 py-2 shadow-sm border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mb-4 space-y-3">
            <div className="flex items-center text-blue-600 cursor-pointer">
              <FaSearch className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Use current location</span>
              <FaCrosshairs className="w-4 h-4 ml-auto" />
            </div>
            <div className="flex items-center text-blue-600 cursor-pointer">
              <FaSearch className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Search in entire Noida
              </span>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-gray-500 text-xs font-medium mb-2">
              Continue searching for...
            </h2>
            {recentSearches.map((location, index) => (
              <div
                key={index}
                className="flex items-center mb-3 cursor-pointer"
              >
                <FaSearch className="w-4 h-4 mr-2 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-black leading-tight">
                    {location}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">Noida</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-gray-500 text-xs font-medium mb-2">
              Top localities
            </h2>
            <div className="max-h-64 overflow-y-auto pr-2">
              {topLocalities.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center mb-3 cursor-pointer"
                >
                  <FaSearch className="w-4 h-4 mr-2 text-gray-600" />
                  <p className="text-sm font-medium text-black">{location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
