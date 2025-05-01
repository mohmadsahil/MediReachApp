import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuthLogin, useAuthVerifyOtp } from "../../hooks/useAuthServices";
import { useNavigate } from "react-router-dom";

const slides = [{ img: "/doctor-banner.png" }];

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(false);
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const {
    mutate: loginMutate,
    data: authData,
    isLoading,
    isError,
    error,
  } = useAuthLogin();
  const {
    mutate: verifyOTPMutate,
    data: verifyOTPData,
    isLoading: verifyOTPLoading,
  } = useAuthVerifyOtp();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!otp) {
      setButtonEnabled(phone.length === 10);
    } else {
      setButtonEnabled(otpValues.every((val) => val !== ""));
    }
  }, [phone, otpValues, otp]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Move focus to next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleButtonClick = () => {
    if (!otp) {
      loginMutate(
        { phone },
        {
          onSuccess: (data) => {
            console.log("OTP Sent Successfully:", data);
            setOtp(true);
          },
          onError: (err) => {
            console.error("Failed to send OTP:", err);
          },
        }
      );
    } else {
      const fullOtp = otpValues.join("");
      verifyOTPMutate(
        { phone, otp: fullOtp },
        {
          onSuccess: (data) => {
            const token = data?.data?.token;
            if (token) {
              localStorage.setItem("token", token);
              window.patientId = atob(token.split(".")[1]);
            }
            if (data?.data?.isRegistered === true) {
              navigate("/");
            } else {
              navigate("/register", { state: { phone: phone } });
            }
          },
          onError: (err) => {
            console.error("Failed to verify OTP:", err);
          },
        }
      );
    }
  };
  return (
    <div className="h-[100vh]">
      {/* Slider */}
      <div>
        <Swiper spaceBetween={10} slidesPerView={1}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#1D3C93] text-white px-6 py-10 text-center h-[60vh]">
                <img
                  src={slide.img}
                  alt="doctor"
                  className="mx-auto my-4 h-36"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-sm bg-white px-6 py-6 -mt-2">
        {!otp ? (
          <>
            <label className="block text-sm font-medium mb-5">
              Let’s get started!
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-5">
              Enter the OTP sent to your phone
            </label>
            <div className="flex justify-between gap-2">
              {otpValues.map((val, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-lg"
                />
              ))}
            </div>
          </>
        )}

        <button
          onClick={handleButtonClick}
          disabled={!buttonEnabled}
          className={`w-full mt-4 py-2 rounded-md transition duration-300 ${
            buttonEnabled
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {otp ? "Login" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default Login;
