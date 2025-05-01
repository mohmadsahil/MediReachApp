export function getToken() {
  // Only attempt to decode if patientId is not already set
  if (!window.patientId) {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode token and parse the payload
        const decodedToken = atob(token.split(".")[1]);
        const decodedObject = JSON.parse(decodedToken);

        // Ensure patientId and fullName exist in decoded token
        if (decodedObject?.patientId && decodedObject?.fullName) {
          window.patientId = decodedObject.patientId;
          window.fullName = decodedObject.fullName;
        } else {
          // If they are missing, handle appropriately
          console.error("Token decoded but missing patientId or fullName.");
          window.patientId = null;
          window.fullName = null;
        }
      } catch (error) {
        console.error("Error decoding the token:", error);
        window.patientId = null;
        window.fullName = null;
      }
    } else {
      console.warn("Token not found in localStorage");
      window.patientId = null;
      window.fullName = null;
    }
  }

  // Return the patientId and fullName, defaulting to null if they are not set
  return { patientId: window.patientId || null, fullName: window.fullName || null };
}
