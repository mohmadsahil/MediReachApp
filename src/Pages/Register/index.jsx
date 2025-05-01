import { useEffect, useState } from "react";
import React from "react";
import { PatientDOB } from "./DOB";
import { PatientEmail } from "./Email";
import { PatientGender } from "./Gender";
import PatientName from "./Name";
import { patientRegister } from "../../hooks/useAuthServices";
import { useLocation, useNavigate } from "react-router-dom";

export const RegisterPatient = () => {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const phone = location.state?.phone;
  // console.log("Phone Number:", phone);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    phone: phone,
  });
  const nextStep = () => setStep((prev) => prev + 1);
  const skipStep = () => setStep((prev) => prev + 2);
  const prevStep = () => setStep((prev) => prev - 1)

  const navigate = useNavigate();
  const {
    mutate: patientRegisterMutate,
    data: patientData,
    isLoading: patientLoading,
  } = patientRegister();

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (data.dob) {
      handleSubmit();
      navigate("/")
    }
  }, [data]);

  const handleSubmit = () => {
    const getAllData = {
      ...data,
    };
    
    patientRegisterMutate(getAllData, {
      onSuccess: (data) => {
        console.log("Patient Registered Successfully:", data);
      },
      onError: (err) => {
        console.error("Failed to register patient:", err);
      },
    });
  };
  useEffect(() => {
    if (patientData) {
      console.log("Patient Data:", patientData);
    }
  }, [patientData]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <PatientName onNext={nextStep} onChange={handleChange} />;
      case 1:
        return (
          <PatientEmail
            onNext={nextStep}
            onSkip={skipStep}
            onChange={handleChange}
            onPrev={prevStep}
          />
        );
      case 2:
        return <PatientGender onNext={nextStep} onChange={handleChange} onPrev={prevStep} />;
      case 3:
        return (
          <PatientDOB
            onNext={nextStep}
            onChange={handleChange}
            onClick={handleSubmit}
            onPrev={prevStep}
          />
        );
    }
  };

  return <div>{renderStep()}</div>;
};
