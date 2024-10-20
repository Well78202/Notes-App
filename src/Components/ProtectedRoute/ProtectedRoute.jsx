import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const localToken = localStorage.getItem("UserToken");
    if (localToken !== null) return children
    else return <Navigate to={"login"}></Navigate>
}

export default ProtectedRoute