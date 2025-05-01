import React, { useState, useEffect } from "react";
import { StarRating } from "./StartRating";
import { formatDate, formatTime } from "../../Utils/utils";
import { IMAGE } from "../../Images/Image";
import { IoMdClose } from "react-icons/io";
import { useSubmitReview } from "../../hooks/usePatientServices";
import { MdDone } from "react-icons/md";

export const ReviewModal = ({
  setIsReviewModal,
  isReviewModal,
  appointment,
}) => {
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [review, setReview] = useState("");

  const handleClose = () => {
    setIsReviewModal(false);
  };

  const {
    mutate: submitReviewMutate,
    data: submitReviewData,
    isLoading,
    isError,
    error,
  } = useSubmitReview();

  const handleRating = (rating) => {
    setRating(rating);
    setRatingText(getRatingText(rating));
  };

  const handleReviewSubmit = () => {
    const payload = {
      patientId: appointment?.patientId,
      data: {
        doctorId: appointment?.doctorId,
        appointmentId: appointment?.appointmentId,
        rating: rating,
        comment: review,
      },
    };

    submitReviewMutate(payload, {
      onSuccess: () => {
        console.log("Review submitted successfully!");
        handleClose();
      },
      onError: (error) => {
        console.error("Error submitting review:", error);
      },
    });
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  if (!isReviewModal) return null;
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-100">
      <div className="">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 relative w-80 text-center">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={handleClose}
            >
              <IoMdClose />
            </button>

            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-bold">
                  {formatTime(appointment?.time)},{" "}
                  {formatDate(appointment?.date)}
                </h2>
                <p className="text-md font-semibold mt-1">
                  {appointment?.doctorInfo?.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  Booked for - {appointment?.patientInfo?.fullName}
                </p>
              </div>
              <div>
                <img
                  src={IMAGE.docimage}
                  alt="Doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            </div>

            {/* Star Rating */}
            <p className="text-center font-semibold mb-2 mt-2 h-5">
              {ratingText}
            </p>
            <div className="flex justify-center mb-4">
              <StarRating
                totalStars={5}
                starSize="text-5xl"
                activeColor="text-yellow-500"
                inactiveColor="text-gray-400"
                onRatingChange={handleRating}
              />
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <label className="text-sm font-semibold block mb-1">
                Write Your Review
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Please share your experience with us ..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
