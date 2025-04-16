import React from "react";
export default function Doctorcategories({ isOpen, setIsOpen }) {
  const categories = [
    "Covid treatment",
    "Sexual Health",
    "Eye Specialist",
    "Women’s Health",
    "Diet & Nutrition",
    "Skin & Hair",
    "Bones & Joints",
    "Child Specialist",
    "Dental care",
    "Heart",
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Find a Doctor
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for symptoms / speciality"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>

          {/* Categories */}
          <div className="space-y-4">
          {categories.map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  {/* Replace with your icon if needed */}
                  <span role="img" aria-label="icon">
                    🩺
                  </span>
                </div>
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
