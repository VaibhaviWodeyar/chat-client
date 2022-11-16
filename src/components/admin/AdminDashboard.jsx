import React from 'react'
import { Link } from 'react-router-dom'
import BatchList from './BatchList'

const AdminDashboard = () => {
  return (
    <div>
      <Link to="/admin/addroles">Add Roles</Link>
        <BatchList/>
    </div>
  )
}

export default AdminDashboard