import React from "react";
import { FaVideo } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const TodayAppointment = () => {
    return (
        <div className="mt-6 p-2 pr-0">
            <h3 className="text-lg font-semibold">Today Appointments</h3>
            <Swiper
                slidesPerView={1.25}
                spaceBetween={10}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mt-2 [&_.swiper-pagination]:hidden"
            >
                <SwiperSlide>
                    <div className="bg-white p-4 rounded-lg shadow flex justify-between">
                        <div className="w-full">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-semibold">Video Consultation</p>
                                    <p className="text-xs text-gray-500">Waiting for call</p>
                                </div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <FaVideo className="text-blue-500 text-lg" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium mt-2">Dr. Carly Angel</p>
                                <p className="text-xs text-gray-500">4:00 PM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-white p-4 rounded-lg shadow flex justify-between">
                        <div>
                            <p className="text-sm font-semibold">Clinic Visit</p>
                            <p className="text-xs text-gray-500">Confirmed</p>
                            <p className="text-xs font-medium mt-2">Dr. John Doe</p>
                            <p className="text-xs text-gray-500">5:30 PM - 8:00 PM</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaVideo className="text-blue-500 text-lg" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TodayAppointment;
