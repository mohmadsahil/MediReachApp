export function getToken() {
  if (!window.patientId) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = atob(token.split(".")[1]);
        const decodedObject = JSON.parse(decodedToken);
        window.patientId = decodedObject.patientId;
      } catch (error) {
        console.error("Error decoding the token:", error);
        window.patientId = null;
      }
    } else {
      console.warn("Token not found in localStorage");
      window.patientId = null;
    }
  }
  return window.patientId;
}
