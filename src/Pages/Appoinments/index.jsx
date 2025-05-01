import React, { useEffect, useState } from "react";
import { IMAGE } from "../../Images/Image";
import {
  useCancelAppointmentById,
  useGetAppointmentById,
} from "../../hooks/usePatientServices";
import { getToken } from "../../Utils/initToken";
import { formatDate, formatTime } from "../../Utils/utils";
import { ReviewModal } from "../../component/ReviewModal";
import { LuPanelLeftOpen } from "react-icons/lu";
import ThreeDotLoader from "../../component/Loder";
import { CancelAppoinmentModal } from "../../component/CancelModal";
import { ReScheduleModal } from "../../component/ReScheduleModal";
import { useNavigate } from "react-router-dom";

export const Appointments = () => {
  const [filter, setFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { patientId } = getToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isRescheduleModal, setRescheduleModal] = useState(false);
  const [isReviewModal ,setIsReviewModal] = useState(false)
  const navigate = useNavigate();

  const { data: appoinmentData, isLoading: appoinmentDataLoading } =
    useGetAppointmentById(patientId, filter);

  const getAllAppoinments = appoinmentData?.data?.appointments;

  const handleRescheduleClick = (appoinmentId) => {
    const selectedAppointment = getAllAppoinments?.find(
      (item) => item.appoinmentId === appoinmentId
    );
    if (selectedAppointment) {
      setSelectedDoctorId(selectedAppointment?.doctorInfo?.doctorId);
      setSelectedAppointment(appoinmentId);
    }
    setRescheduleModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white p-4">
        {/* <ThreeDotLoader/> */}
        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {["All", "Pending", "Confirmed", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                filter === item
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Appointment Card */}
        {getAllAppoinments && getAllAppoinments?.length > 0 ? (
          getAllAppoinments.map((item) => (
            <>
              <div
                key={item.appoinmentId}
                className="rounded-lg p-4 shadow-lg mb-4"
              >
                {item?.status == "confirmed" && (
                  <div className="flex items-end justify-end">
                    <button
                      onClick={() => {
                        setIsReviewModal(true);
                        setSelectedAppointment(item);
                      }}
                    >
                      <LuPanelLeftOpen />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="text-lg font-bold">
                      {formatTime(item?.time)}, {formatDate(item?.date)}
                    </h2>
                    <p className="text-md font-semibold mt-1">
                      {item?.doctorInfo?.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Booked for - {item?.patientInfo?.fullName}
                    </p>
                    {/* <p>{item?.payementAmt}</p>
                    <p>{item?.paymentStatus ? "Online" : "Clinic"}</p> */}
                    <div
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item?.status
                      )}`}
                    >
                      {item?.status}
                    </div>
                  </div>
                  <div>
                    <img
                      src={IMAGE.docimage}
                      alt="Doctor"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    {/* {showModal && (
                      <ReviewModal
                        onClose={() => setShowModal(false)}
                        appointment={selectedAppointment}
                      />
                    )} */}
                  </div>
                </div>
                <div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-600 text-[14px]">
                      {"Pay at - "}
                      {item?.paymentStatus ? "Online" : "Clinic"}
                    </p>
                    <p className="font-bold text-blue-600">
                      {"₹"}
                      {item?.payementAmt}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {item?.doctorInfo?.clinicName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item?.doctorInfo?.clinicAddress}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    className={`py-1 px-2 rounded-3xl font-semibold ${
                      item?.status !== "cancelled"
                        ? "bg-green-500"
                        : "bg-blue-500 text-white ml-auto"
                    }`}
                    onClick={() => {
                      if (item?.status !== "cancelled") {
                        handleRescheduleClick(item.appoinmentId);
                      } else {
                        navigate("/all-doctors");
                      }
                    }}
                  >
                    {item?.status !== "cancelled" ? "Reschedule" : "ReBook"}
                  </button>

                  {item?.status !== "cancelled" && (
                    <button
                      className="bg-red-500 py-1 px-8 rounded-3xl font-semibold"
                      onClick={() => {
                        setSelectedAppointment(item?.appoinmentId);
                        setIsModalOpen(true);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No appointments found.</p>
          </div>
        )}
      </div>
      <CancelAppoinmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        appoinmentId={selectedAppointment}
      />
      <ReScheduleModal
        isRescheduleModal={isRescheduleModal}
        selectedDoctorId={selectedDoctorId}
        setRescheduleModal={setRescheduleModal}
        appoinmentId={selectedAppointment}
      />
      <ReviewModal isReviewModal={isReviewModal} setIsReviewModal={setIsReviewModal} appointment={selectedAppointment}/>
    </>
  );
};
