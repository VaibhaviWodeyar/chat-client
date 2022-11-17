import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {
    let {user} = useSelector(state => state.auth);
    if(user?.TOKEN){
        return <>
        {children}
        </>
    }else {
        return <Navigate to="/auth/login" />
    }
}

export default PrivateRoute