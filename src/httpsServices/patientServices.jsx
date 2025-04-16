import EndPoint from "../config/EndPoints";
import Http from "./https";

export const PatientServices = {
    async bookAppoinment({ ...data }) {
        return Http.post(EndPoint.BOOK_APPOINTMENT, { ...data });
    }
}
