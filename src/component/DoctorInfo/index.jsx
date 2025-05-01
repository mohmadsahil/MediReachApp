import React from "react";
import BookSlot from "./BookSlot";
import { useLocation, useParams } from "react-router-dom";
import { useSlotByDoctorId } from "../../hooks/useDoctorServices";

const DoctorsInfo = () => {
  const { doctorId } = useParams();
  const { state } = useLocation();
  const doctor = state?.doctorData;

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useSlotByDoctorId(doctorId);

  // console.log("slots",slots)

  return (  
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden border-gray-200">
      {/* Header */}
      <div className="p-4 flex items-start justify-between bg-gradient-to-r from-blue-100 to-white">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">
            {doctor?.fullName || "Dr. Ravishankar Reddy"}
          </h2>
          <p className="text-sm text-gray-700">{doctor?.specialization}</p>
          <p className="text-xs text-gray-600 mt-1 italic">
            Special interest in Diabetologist
          </p>
          <p className="text-xs text-gray-600">{`${doctor?.qualification} - General Medicine`}</p>
          <p className="text-sm text-gray-800 font-medium mt-1">
            {`${doctor?.experience} Years Experience Overall`}
          </p>
        </div>
        <img
          src={doctor?.profileImage || "https://via.placeholder.com/150"}
          alt="Doctor Profile Image"
          className="w-24 h-24 rounded-md object-cover ml-4 border"
        />
      </div>

      {/* Ratings */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className="bg-green-100 px-2 py-1 rounded">
            👍 87%
          </span>
          <span className="text-gray-600">969 Patient Stories</span>
        </div>
        <div className="text-sm text-blue-700 font-semibold">
          <span className="bg-blue-100 px-2 py-1 rounded">⭐ {doctor?.averageRating || 1.0}</span>
        </div>
      </div>
      <BookSlot doctor={doctor} slots={slots}/>
      <div className="px-4 py-4 bg-white">
        <h4 className="text-md font-semibold text-gray-800 mb-3">Patient Actions</h4>
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Book Clinic Visit
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-1 hover:bg-blue-50">
            📞 Call Clinic
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsInfo;



