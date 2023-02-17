import React from "react";
import { Outlet } from "react-router-dom";
import NavbarStudentDashboard from "../components/NavbarStudentDashboard";

const StudentDashboardLayout = () => {
  return (
    <>
    <NavbarStudentDashboard />
      <Outlet />
    </>
  );
};

export default StudentDashboardLayout;
