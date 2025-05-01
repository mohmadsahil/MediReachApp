const EndPoint = {
    DOCTOR_LIST: "/doctors",
    DOCTOR_BY_ID: "/doctor",
    SLOT_BY_DOCTOR_ID: "/all-slots",

    LOGIN: "/login",
    VERIFY_OTP: "/verify-otp",
    REGISTER: "/register",

    BOOK_APPOINTMENT:'/appoinment',
    GET_APPOINTMENTS_BY_ID:'/appoinment',
    CANCEL_APPOINTMENTS_BY_ID:'/cancel-appoinment',
    RESCHEDULE_APPOINTMENTS_BY_ID:'/appoinment-reschedule',
    SUBMIT_REVIEW:'/reviews',

    GET_ALL_ADDED_PATIENTS:'/all-patients',
    ADD_NEW_PATIENT:'/add-patient',
    UPDATE_NEW_PATIENT:'/update-patient',

    GET_CITIES:'/cities',

    GET_CURRENT_LOCATION :'/get-current-location'
}

export default EndPoint;