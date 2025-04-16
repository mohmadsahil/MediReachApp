import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "../httpsServices/authServices";

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: AuthServices.verifyOtp,
  });
};

export const useAuthVerifyOtp = () => {
    return useMutation({
        mutationFn: AuthServices.login,
    }); 
}

export const patientRegister = () => {
  return useMutation({
    mutationFn: AuthServices.patientRegister,
  });
}