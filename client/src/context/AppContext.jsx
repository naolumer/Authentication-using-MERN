import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"




export const AppContext = createContext()

const AppContextProvider = (props)=>{
    
    const backURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const [userData,setUserData] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = async ()=>{
        try {
            const {data} = await axios.get(`${backURL}/api/auth/is-auth`)

            data.success && setIsLoggedIn(true)
            data.success && getUserData()

        } catch(error){
            toast.error(error.message)
        }
    }

    const getUserData = async()=>{

        try {
            const {data} = await axios.get(`${backURL}/api/user/data`)

        if (data.success) {
            setUserData(data.userData)
        
        } else {
            toast.error(data.message)
        }

        } catch (error){
            toast.error(error.message)
        }
        
    }

    useEffect(()=>{
        isAuthenticated()
    },[])

    const value ={
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,backURL
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider