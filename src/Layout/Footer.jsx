import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaUser, FaCartPlus } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { SideMenu } from "../component/SideMenu";

const Footer = () => {
  const currentPath = window.location.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-2 left-4 right-4 bg-white p-3 flex justify-around shadow-md z-10 rounded-[45px]">
        <a href="/">
          <FaHome
            className={`${
              currentPath === "/" ? "text-blue-800" : "text-gray-500"
            } text-xl`}
          />
        </a>
        <a href="/appointments">
          <FaCalendarAlt
            className={`${
              currentPath === "/appointments"
                ? "text-blue-800"
                : "text-gray-500"
            } text-xl`}
          />
        </a>
        <a>
          <FaUser
            className={`${
              currentPath === "/profile" ? "text-blue-800" : "text-gray-500"
            } text-xl`}
            onClick={()=> setDrawerOpen(true)}
          />
        </a>
        <a href="/messages">
          <FaMessage
            className={`${
              currentPath === "/messages" ? "text-blue-800" : "text-gray-500"
            } text-xl`}
          />
        </a>
        <a href="/all-doctors">
          <FaCartPlus
            className={`${
              currentPath === "/all-doctors" ? "text-blue-800" : "text-gray-500"
            } text-xl`}
          />
        </a>
      </div>
      <SideMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};

export default Footer;
