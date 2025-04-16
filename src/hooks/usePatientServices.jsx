import { useMutation } from "@tanstack/react-query";
import { PatientServices } from "../httpsServices/patientServices";

export const useBookAppoinment = () => {
    return useMutation({
      mutationFn: PatientServices.bookAppoinment,
    });
  };