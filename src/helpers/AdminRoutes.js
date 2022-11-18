import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const AdminRoute = ({children}) => {
    let {user} = useSelector(state => state.auth);
    if(user?.TOKEN && user?.role === "admin"){
        return <>
        {children}
        </>
    }else {
        return <Navigate to="/auth/admin/login" />
    }
}

export default AdminRoute