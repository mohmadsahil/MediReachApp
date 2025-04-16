import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Doctorcategories from "../DoctorCategories";

const specialties = [
  { name: "Anesthesiology", color: "bg-purple-500" },
  { name: "Pediatrics", color: "bg-red-500" },
  { name: "Ophthalmology", color: "bg-blue-500" },
  { name: "Mental Health", color: "bg-yellow-500" },
  { name: "Dermatology", color: "bg-green-500" },
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
        <Swiper spaceBetween={10} slidesPerView={5} className="mt-2">
          {specialties.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <div
                  className={`p-2 h-12 rounded-lg ${item.color} text-white text-xs font-semibold`}
                >
                  {item.name.charAt(0)}
                </div>
                <p className="text-[7px]">{item.name}</p>
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
