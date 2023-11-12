import axios from "axios";
import {  useEffect } from "react";
import useAuth from "./useAuth";
import toast from "react-hot-toast";


let axiosCustom=axios.create({baseURL:import.meta.env.VITE_URL,withCredentials:true});


const useAxiosIntercepter = () => {
 




useEffect(()=>{
    axiosCustom.interceptors.response.use(res=>{
        return res
    },error=>{
       if(error.response.status===401){
      console.log(error)
       }
       if(error.response.status===403){
      
     if(error.response.data.message){
        toast.error(error.response.data.message)
     }
       
       }
    })
},[])



    return axiosCustom
};

export default useAxiosIntercepter;