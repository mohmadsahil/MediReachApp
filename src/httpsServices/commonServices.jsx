import EndPoint from "../config/EndPoints";
import Http from "./https";

const CommonServices = {
  async getcities() {
    return Http.get(EndPoint.GET_CITIES);
  },

  async getCurrentLocation({ lat, lng }) {
    // console.log("@@",lat,lng)
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return Http.get(url); // Make sure Http.get returns response.data
  },

};

export default CommonServices;
