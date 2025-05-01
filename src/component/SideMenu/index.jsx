import React from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiGrid,
  FiFileText,
  FiBell,
  FiEdit,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { getToken } from "../../Utils/initToken";

export const SideMenu = ({ drawerOpen, setDrawerOpen }) => {
  const {fullName} = getToken()
  const menuItems = [
    {
      icon: <FiCalendar className="text-blue-500" />,
      label: "Book Appointment",
    },
    { icon: <FiClock className="text-purple-500" />, label: "My Appointments" },
    { icon: <FiUser className="text-green-500" />, label: "Doctors" },
    { icon: <FiGrid className="text-orange-500" />, label: "Specialties" },
    { icon: <FiFileText className="text-red-500" />, label: "Prescriptions" },
    { icon: <FiBell className="text-yellow-500" />, label: "Notifications" },
    { divider: true },
    { icon: <FiEdit className="text-gray-500" />, label: "Edit Profile" },
    { icon: <FiSettings className="text-gray-500" />, label: "Settings" },
    { icon: <FiHelpCircle className="text-gray-500" />, label: "Help" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-500/75 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setDrawerOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5">
            <div>
              <p className="text-sm">Hi,</p>
              <h2 className="text-md font-bold">{fullName}</h2>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) =>
                item.divider ? (
                  <li
                    key={index}
                    className="border-t border-gray-100 my-2"
                  ></li>
                ) : (
                  <li key={index}>
                    <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="p-4 border-t">
            <button className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <span className="text-gray-700 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
