import React from "react";

export const SideMenu = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-500/75 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setDrawerOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-500 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto h-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
          <ul className="space-y-4">
            <li className="text-gray-800">Edit Profile</li>
            <li className="text-gray-800">Settings</li>
            <li className="text-gray-800">Help</li>
            <li className="text-gray-800">Logout</li>
          </ul>
        </div>
      </div>
    </>
  );
};
