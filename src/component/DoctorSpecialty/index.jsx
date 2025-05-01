import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Doctorcategories from "../DoctorCategories";
import { FaUserMd, FaBaby, FaEye, FaBrain, FaHandHoldingMedical } from "react-icons/fa";

const specialties = [
  { name: "Anesthesiology", color: "bg-purple-500", icon: FaUserMd },  // Doctor icon
  { name: "Pediatrics", color: "bg-red-500", icon: FaBaby },            // Baby icon
  // { name: "Ophthalmology", color: "bg-blue-500", icon: FaEye },          // Eye icon
  { name: "Mental Health", color: "bg-yellow-500", icon: FaBrain },      // Brain icon
  { name: "Dermatology", color: "bg-green-500", icon: FaHandHoldingMedical }, // Hand/Medical icon
];

const DoctorSpecialty = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mt-6 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Doctor Specialty</h3>
          <p
            className="text-gray-400 text-[12px]"
            onClick={() => setIsOpen(true)}
          >
            See All
          </p>
        </div>
        <Swiper spaceBetween={10} slidesPerView={4} className="mt-2">
          {specialties.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <div
                  className={`py-5 rounded-lg ${item.color} text-white text-xs font-semibold`}
                >
                  <item.icon className="w-6 h-6 mx-auto" />
                </div>
                <p className="text-[10px]">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Doctorcategories isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DoctorSpecialty;
