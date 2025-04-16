import React from "react";
import { FaThumbsUp, FaComments, FaPhone } from "react-icons/fa";

const AllDoctorsCard = ({ doctor }) => {
    return (
        <div className="bg-white shadow-md p-2 rounded-lg">
            <a href="/doctors-info">
                <div className="flex items-center space-x-4">
                    <img src={doctor.image} alt="Profile" className="w-14 h-14 rounded-full" />
                    <div className="w-full">
                        <h2 className="text-lg font-semibold">{doctor.name}</h2>
                        <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                        {doctor.experience && <p className="text-gray-600 text-xs">{doctor.experience}</p>}
                        {doctor.interest && <p className="text-gray-600 text-xs">{doctor.interest}</p>}
                        <div className="flex items-center text-green-600 text-sm mt-1">
                            {doctor.rating && <><FaThumbsUp className="mr-1" /> {doctor.rating}</>}
                            {doctor.stories && <><FaComments className="ml-2 mr-1" /> {doctor.stories}</>}
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-col w-1/2">
                        <p className="text-gray-600 text-sm font-semibold">{doctor.location}</p>
                        <p className="text-gray-600 text-sm text-[10px]">{doctor.fees}</p>
                    </div>
                    <div className="w-1/2">
                        <button className="mt-2 bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center text-[12px]">
                            <FaPhone className="mr-2" /> Contact Clinic
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default AllDoctorsCard;
