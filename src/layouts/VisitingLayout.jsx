import React from 'react'
import Navbar from '../components/NavbarVisiting';
import { Outlet } from "react-router-dom";

const VisitingLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default VisitingLayout