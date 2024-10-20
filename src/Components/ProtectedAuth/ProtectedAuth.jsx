import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedAuth = ({children}) => {
    const localToken = localStorage.getItem("UserToken");
    if (localToken === null) return children
    else return <Navigate to={"/"}></Navigate>
}

export default ProtectedAuth