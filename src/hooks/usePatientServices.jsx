import { useMutation, useQuery } from "@tanstack/react-query";
import { PatientServices } from "../httpsServices/patientServices";

export const useBookAppoinment = () => {
  return useMutation({
    mutationFn: PatientServices.bookAppoinment,
  });
};

export const useGetAppointmentById = (patientId, status) => {
  return useQuery({
    queryKey: ["appointments", patientId, status],
    queryFn: () => PatientServices.getAppointmentById(patientId, status),
  });
};

export const useCancelAppointmentById = (appointmentId) => {
  return useMutation({
    mutationFn: (data) => {
      PatientServices.cancelAppointmentById(appointmentId, data);
    },
  });
};

export const useRescheduleAppointmentById = (appointmentId) => {
  return useMutation({
    mutationFn: (data) => {
      PatientServices.rescheduleAppointmentById(appointmentId, data);
    },
  });
};

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: PatientServices.submitReview,
  });
};

export const useGetAllAddedPatients = (patientId) => {
  return useQuery({
    queryKey: ["allAddedPatients", patientId],
    queryFn: () => PatientServices.getNewAddedPatients(patientId),
  });
};

export const addNewPatient = ()=>{
  return useMutation({
    mutationFn: (data) => {
      PatientServices.addNewPatient(data);
    },
  })
}

export const updateNewPatient = (getSelectPatientId)=>{
  return useMutation({
    mutationFn: (data) => {
      PatientServices.updateNewPatient({getSelectPatientId,data});
    },
  })
}