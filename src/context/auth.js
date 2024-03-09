import { useState,useContext,useEffect, createContext } from "react";
import axios from "axios";
const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    });
    axios.defaults.headers.common['authorization'] = auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parsedata=JSON.parse(data)
            setAuth({
                ...auth,
                user:parsedata.User,
                token:parsedata.token,
            });
        }
    },[])
    
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}; 
const useAuth=()=>useContext(AuthContext);
export {useAuth,AuthProvider};