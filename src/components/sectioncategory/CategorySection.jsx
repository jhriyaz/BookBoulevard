import { useEffect, useState } from "react";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";
import Book from "../../pages/Books/allbooks/Book";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const CategorySection = ({category}) => {

    const axiosCustom=useAxiosIntercepter()
   

    let {isFetching,isLoading,data,refetch}=useQuery({
        queryKey:[`category${category}`],
        queryFn:async()=>{
            return await axiosCustom.get(`/category?category=${category}`)
        }
    })
    

    useEffect(()=>{
        refetch()
    },[refetch])

    if(isLoading||isFetching){
        return(
            <div className="bg-[#4b2b53] w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
            <span className="loading loading-infinity loading-lg"></span>
           </div>
        )
    }

    


    return (
       <section className="container mx-auto mt-24 px-4">
        <div className="flex items-center justify-between bg-[#1f1e1e94] rounded-md p-4">
            <h1 className=" text-lg font-bold uppercase"> {category} </h1>
            <Link to={`/categories/${category}`}><button className= "join-item btn  text-[#A21942] bg-[#4b2b53] btn-active">View All</button></Link>
        </div>
<div className="grid lg:grid-cols-4 grid-cols-1 gap-4 p-4">
{
   data?.data?.map(book=><Book key={book._id} book={book}></Book>)
}
</div>
       </section>
    );
};

export default CategorySection;