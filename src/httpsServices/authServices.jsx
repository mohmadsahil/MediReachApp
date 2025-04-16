import EndPoint from "../config/EndPoints";
import Http from "./https";

export const AuthServices = {
  async login({ phone, otp }) {
    return Http.post(EndPoint.LOGIN, { phone, otp });
  },

  async verifyOtp({ phone }) {
    return Http.post(EndPoint.VERIFY_OTP, { phone });
  },
  async patientRegister({ ...data }) {
    return Http.post(EndPoint.REGISTER, { ...data });
  },
  // async resendOtp(mobile) {
  //     return Http.post(EndPoint.RESEND_OTP, { mobile });
  // }
};
