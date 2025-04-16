import EndPoint from "../config/EndPoints";
import Http from "./https";

export const DoctorServices = {
  async getDoctorList() {
    return Http.get(EndPoint.DOCTOR_LIST);
  },

  async getDoctorById(doctorId) {
    return Http.get(`${EndPoint.DOCTOR_BY_ID}/${doctorId}`);
  },

  async getSlotByDoctorId(doctorId) {
    const today = new Date().toISOString().split("T")[0];
    return Http.get(`${EndPoint.SLOT_BY_DOCTOR_ID}/${doctorId}?date=${today}`);
  }
};
