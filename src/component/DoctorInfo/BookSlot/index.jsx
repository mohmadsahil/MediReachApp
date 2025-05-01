import React, { useEffect, useState } from "react";
import { useSlotByDoctorId } from "../../../hooks/useDoctorServices";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmScheduleModal } from "../../ReScheduleModal/ConfirmSchedulModal";

const BookSlot = ({
  doctor,
  selectedDoctorId,
  appoinmentId,
  setRescheduleModal,
}) => {
  const { doctorId } = useParams();
  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useSlotByDoctorId(doctorId || selectedDoctorId);


  // console.log("dataw234",slots)

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("today");
  const [scheduleModal, setScheduleModal] = useState(false);
  // console.log("scheduleModal", scheduleModal);
  const [slotClicked, setSlotClicked] = useState("");
  const availableSlots = slots?.data?.availableSlots || [];
  const todaySlots = availableSlots;
  const tomorrowSlots = availableSlots;
  const getDoctorData = doctor;

  // console.log("appoinmentId123",appoinmentId)

  const bookSlot = (slot) => {
    navigate("/confirm-appoinment", {
      state: { doctorId, slot, date: slots?.data?.date, getDoctorData },
    });
  };

  const handleSlotBoooked = (slot) => {
    if (selectedDoctorId) {
      setSlotClicked(slot);
      setScheduleModal(true);
    } else {
      bookSlot(slot);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-100 p-4 flex items-center space-x-2">
          <span className="text-blue-600 text-xl">🏥</span>
          {selectedDoctorId ? (
            <h2 className="font-semibold text-lg">Reschedule Clinic Visit</h2>
          ) : (
            <h2 className="font-semibold text-lg">Book Clinic Visit</h2>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">
            {doctor?.doctor?.clinicName}
          </h3>
          <p className="text-gray-500 text-sm">
            {doctor?.doctor?.clinicAddress} {doctor?.doctor?.city}
          </p>
          {doctor && (
            <p className="text-right font-semibold text-lg mt-1">
              ₹ {doctor?.feesPerConsultation} fee
            </p>
          )}

          {/* Tabs */}
          {availableSlots.length ? (
            <>
              <div className="flex space-x-6 mt-4 border-b pb-2">
                {["today", "tomorrow"].map((tab) => (
                  <div
                    key={tab}
                    className={`cursor-pointer ${
                      selectedTab === tab
                        ? "border-b-2 border-blue-500 font-bold text-black"
                        : "text-gray-600"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab === "today" ? (
                      <span>
                        Today{" "}
                        <span className="text-green-600">
                          ({todaySlots.length} Slots)
                        </span>
                      </span>
                    ) : (
                      <span>
                        Tomorrow
                        <span className="text-green-600">
                          ({tomorrowSlots.length} Slots)
                        </span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-5 mt-4 overflow-x-auto">
                {(selectedTab === "today" ? todaySlots : tomorrowSlots).map(
                  (slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotBoooked(slot)}
                      className="bg-blue-500 mb-5 text-white py-2 px-10 w-2xl rounded-lg text-sm hover:bg-blue-600 transition whitespace-nowrap"
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>

              {/* View All */}
              {/* <div className="text-center mt-4">
              <button className="text-blue-500 font-medium hover:underline">
                View all slots
              </button>
            </div> */}
            </>
          ) : (
            <p className="text-blue-500 font-medium text-center mt-4">
              Slots are not Available
            </p>
          )}
        </div>
      </div>
      {scheduleModal && (
        <ConfirmScheduleModal
          setScheduleModal={setScheduleModal}
          scheduleModal={scheduleModal}
          selectedSlot={slotClicked}
          doctor={doctor}
          date={slots?.data?.date}
          appoinmentId={appoinmentId}
          setRescheduleModal={setRescheduleModal}
        />
      )}
    </>
  );
};

export default BookSlot;
