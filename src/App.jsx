import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Home from './Pages/Home';
import DoctorsInfo from './component/DoctorInfo'
import AllDoctors from './component/AllDoctors/AllDoctors'
// import DoctorsInfo from './assets/component/DoctorInfo/DoctorsInfo';
import Login from './Pages/Login';
import Doctorcategories from './component/DoctorCategories';
import BottomDrawerModal from './component/DoctorCategories';
import { RegisterPatient } from './Pages/Register';
import ConfirmAppoinment from './component/DoctorInfo/ConfirmAppoinment';
// import { getPatientId } from './Utils/initToken';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';
  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/info" element={<DoctorsInfo/>} />
        {/* <Route path="/doctor-categories" element={<BottomDrawerModal/>} /> */}
        <Route path="/all-doctors" element={<AllDoctors/>} />
        <Route path="/doctor/:doctorId" element={<DoctorsInfo/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterPatient/>} />
        <Route path="/confirm-appoinment" element={<ConfirmAppoinment/>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
