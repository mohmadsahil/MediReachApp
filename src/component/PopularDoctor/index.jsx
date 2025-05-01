import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorById, useDoctorList } from "../../hooks/useDoctorServices.jsx";

const PopularDoctors = () => {
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const { data: doctorData, isLoading, isError, error } = useDoctorList();
  // const {
  //   data: doctorById,
  //   isLoading: doctorByIdLoading,
  //   isError: doctorByIdError,
  // } = useDoctorById(selectedDoctorId);

  const fetchDoctorData = doctorData?.data?.AllDoctors;
  // useEffect(() => {
  //   if (doctorData) {
  //     console.log("Fetched doctor data:", doctorData?.data?.AllUser);
  //   }
  //   if (doctorById) {
  //     console.log("Doctor details:", doctorById);
  //   }
  //   if (isError) {
  //     console.error("Error fetching doctor list:", error);
  //   }
  // }, [doctorData, isError,doctorById]);


  // const handleDoctorClick = (doctorId) => {
  //   setSelectedDoctorId(doctorId);
  //   navigate(`/doctor/${doctorId}`); 
  //   // navigate(`/doctor/${doctorId}`, { state: { doctorData: doctorById } });
  // }

  const handleDoctorClick = (doctor) => {
    navigate(`/doctor/${doctor.doctorId}`, { state: { doctorData: doctor } });
  };
  
  return (
    <div className="mt-6 px-[10px] py-0">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Popular Doctors</h3>
        <p  
          className="text-gray-400 text-[12px]"
          onClick={() => navigate("/all-doctors")}
        >
          See All
        </p>
      </div>
      {fetchDoctorData?.map((doctor) => (
        <div
          className="bg-white p-4 rounded-lg shadow mt-2 flex items-center"
          key={doctor?.doctorId}
          onClick={() => handleDoctorClick(doctor)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={doctor?.profileImage}
            alt={doctor?.profileImage}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="font-semibold text-[12px]">{doctor?.fullName}</p>
              <p className="text-xs text-yellow-500">
                ⭐ {doctor?.averageRating || 1.0}
              </p>
            </div>
            {/* <p className="text-xs text-gray-500">{doctor?.specialization}</p> */}
            <div className="flex text-[10px] justify-between items-center mt-2">
              <div className="bg-blue-100 px-4 py-1 rounded-full text-blue-700">
                {doctor?.specialization}
              </div>
              <div>
                <div className="text-right">
                  <p>{doctor?.Schedules[0]?.days}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>{doctor?.Schedules[0]?.startTime}</p>
                  <p>{doctor?.Schedules[0]?.endTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularDoctors;
