// utils.js
import { IMAGE } from "../Images/Image";


export const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad"];


export const doctorData = [
    {
      id: 1,
      name: "Dr. Kamala Ragimova",
      specialty: "Anesthesiology",
      rating: 4.8,
      time: "10:30 AM - 2:00 PM",
      image: IMAGE.docimage,
    },
    {
      id: 2,
      name: "Dr. Aydin Mammadov",
      specialty: "Cardiology",
      rating: 4.6,
      time: "9:00 AM - 12:00 PM",
      image: IMAGE.docimage,
    },
    {
      id: 3,
      name: "Dr. Leyla Guliyeva",
      specialty: "Dermatology",
      rating: 4.9,
      time: "1:00 PM - 4:00 PM",
      image: IMAGE.docimage,
    },
    {
      id: 4,
      name: "Dr. Tural Huseynov",
      specialty: "Neurology",
      rating: 4.7,
      time: "3:30 PM - 6:30 PM",
      image: IMAGE.docimage,
    },
    {
      id: 5,
      name: "Dr. Nigar Aliyeva",
      specialty: "Pediatrics",
      rating: 4.5,
      time: "8:00 AM - 11:00 AM",
      image: IMAGE.docimage,
    },
  ];

  export const getRatingin2Digits = (rating) => {
    return rating.toFixed(2);
  }