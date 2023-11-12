import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";
import { useQuery } from "react-query";
import Book from "../Books/allbooks/Book";

const Category = () => {
    let axiosCustom=useAxiosIntercepter()
    let catagory = useParams().category
   useEffect(()=>{
   
   },[axiosCustom,catagory])

let {isFetching,isLoading,data}=useQuery({
    queryKey:['categoryAll'],
    queryFn:async()=>{
       return await axiosCustom.get(`/allbooks/category/${catagory}`)
    }
})




   if(isLoading||isFetching){
    return(
        <div className="bg-[#4b2b53] w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
       </div>
    )
}

if(data.data.length<1){
    return(
  <h2 className=" text-center font-bold text-lg py-72 px-4">No Book Available</h2>

    )
}

    return (
<div className=" py-24">

<h2 className="py-2 font-semibold text-4xl text-center transTTa ">
       {data?.data[0]?.catagory}
          </h2>

 <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 p-4 pt-10 container mx-auto">

 {
   data?.data?.map(book=><Book key={book._id} book={book}></Book>)
}


 </div>

        </div>
    );
};

export default Category;