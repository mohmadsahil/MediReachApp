import EndPoint from "../config/EndPoints";
import Http from "./https";

export const PatientServices = {
  async bookAppoinment({ ...data }) {
    return Http.post(EndPoint.BOOK_APPOINTMENT, { ...data });
  },

  async getAppointmentById(patientId, status) {
    return Http.get(
      `${EndPoint.GET_APPOINTMENTS_BY_ID}/${patientId}?status=${status}`
    );
  },

  async cancelAppointmentById(appoinmentId,data) {
    return Http.post(`${EndPoint.CANCEL_APPOINTMENTS_BY_ID}/${appoinmentId}`,data);
  },
  
  async rescheduleAppointmentById(appoinmentId,data) {
    return Http.post(`${EndPoint.RESCHEDULE_APPOINTMENTS_BY_ID}/${appoinmentId}`,data);
  },

  async submitReview({ patientId, data }) {
    return Http.post(`${EndPoint.SUBMIT_REVIEW}/${patientId}`, data);
  },

  async getNewAddedPatients({patientId}){
    return Http.get(`${EndPoint.GET_ALL_ADDED_PATIENTS}/${patientId}`)
  },

  async addNewPatient ({...data}){
    return Http.post(EndPoint.ADD_NEW_PATIENT,{...data})
  },
  async updateNewPatient ({getSelectPatientId,data}){
    return Http.post(`${EndPoint.UPDATE_NEW_PATIENT}/${getSelectPatientId}`,data)
  }
};
