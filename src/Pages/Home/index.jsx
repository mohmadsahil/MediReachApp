import React from "react";
import DoctorSpecialty from "../../component/DoctorSpecialty";
import PopularDoctors from "../../component/PopularDoctor";
import TodayAppointment from "../../component/TodayAppoinment";
import LocationSelector from "../../component/LocationSelector";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 overflow-y-auto pb-16">
      <div className="flex justify-end mr-2">
        <LocationSelector />
      </div>
      <TodayAppointment />
      <DoctorSpecialty />
      <PopularDoctors />
    </div>
  );
};

export default Home;
