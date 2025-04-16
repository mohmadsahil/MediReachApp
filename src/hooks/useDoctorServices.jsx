import { useQuery } from "@tanstack/react-query";
import { DoctorServices } from "../httpsServices/doctorServices";

export const useDoctorList = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: DoctorServices.getDoctorList,
  });
};


export const useDoctorById = (doctorId) => {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => DoctorServices.getDoctorById(doctorId),
  });
}

export const useSlotByDoctorId = (doctorId) => {
  return useQuery({
    queryKey: ["slots", doctorId],
    queryFn: () => DoctorServices.getSlotByDoctorId(doctorId),
  });
}