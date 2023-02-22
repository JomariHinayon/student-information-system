import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdminDashboard from '../components/navbars/NavbarAdminDashboard'

const AdminDashboardLayout = () => {
  return (
    <>
    <NavbarAdminDashboard />
    <Outlet />
    </>
  )
}

export default AdminDashboardLayout