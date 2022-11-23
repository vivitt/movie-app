import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthenticationProv";

const RequireAuth = ({children}) => {
    const { authData } = useAuth();

    const location = useLocation()
    
    if(!authData.email) {
        return <Navigate to="/" state={{ from : location }} replace />
}
return   children


}
export default RequireAuth



