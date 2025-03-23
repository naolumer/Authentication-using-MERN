import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"




export const AppContext = createContext()

const AppContextProvider = (props)=>{
    
    const backURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const [userData,setUserData] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getUserData = async()=>{

        try {
            const {data} = await axios.get(`${backURL}/api/user/data`)

        if (data.success) {
            
            const name = data.userData.name
            const isAccountVerified = data.userData.isAccountVerified
            setUserData({
                name,
                isAccountVerified
            })
            setIsLoggedIn(true)
        } else {
            toast.error(data.message)
        }

        } catch (error){
            toast.error(error.message)
        }
        
    }

    useEffect(()=>{
        getUserData()
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