import { useEffect, useState } from "react";
import useAxiosIntercepter from "../../../hooks/useAxiosIntercepter";
import { useQuery } from "react-query";

const usePagination = (number,key,link) => {
    let[perPage,setPerPage]= useState(5)
    let [currentPage,setCurrentPage]= useState(0)
    const axiosCustom=useAxiosIntercepter()


    let {isLoading,data:booksData,error,isFetching,refetch}=useQuery({
        queryKey:[key],
        queryFn:async()=>{
            return await axiosCustom.get(link)
        }
           
       
    })

    let handleClick=page=>{
        setCurrentPage(page)
    
    }
    let handlePerPage=e=>{
       setPerPage(parseInt(e.target.value))
       setCurrentPage(0)
      
    }


    return (
        <div>
            
        </div>
    );
};

export default usePagination;