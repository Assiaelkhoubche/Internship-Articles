import React from "react";
import {Navigate} from 'react-router-dom'
import { useAuth } from "../hooks/AuthProvider";



const ProtectedRoute = ({children}) => {

    // const [isAuthorized, setIsAuthorized] = useState(null);
    const {isAuthenticated:isAuthorized}=useAuth()


    if(isAuthorized===null){
    return (
        <div className='py-40'>
            Loading ...
        </div>
    )
    }

    return isAuthorized? children : <Navigate to='/register'/>

}

export default ProtectedRoute
