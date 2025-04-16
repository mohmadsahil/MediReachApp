import React, { useState } from "react";
import {
    FaSearch,
    FaBell,
    FaMicrophone,
} from "react-icons/fa";
import { SideMenu } from "../component/SideMenu";

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {/* HEADER */}
            <div className="bg-blue-900 p-2 text-white rounded-bl-[25px] rounded-br-[25px] sticky top-0 z-50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
                            alt="profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setDrawerOpen(true)}
                        />
                        <div>
                            <p className="text-white text-sm">Hi</p>
                            <h2 className="text-xl font-bold">Akash Khan</h2>
                        </div>
                    </div>
                    <FaBell className="text-white text-xl" />
                </div>

                <div className="mt-1 flex items-center bg-white px-4 py-1 rounded-full text-[10px]">
                    <FaSearch className="text-black mr-2" />
                    <input
                        type="text"
                        placeholder="Search doctor by name..."
                        className="flex-1 bg-transparent placeholder-black outline-none text-black"
                    />
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaMicrophone className="text-black text-lg w-3 h-3" />
                    </div>
                </div>
            </div>

            <SideMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        </>
    );
};

export default Header;
