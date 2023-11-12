import { useQuery } from "react-query";
import useAxiosIntercepter from "../../../hooks/useAxiosIntercepter";
import BorrowedBook from "../../../components/sectioncategory/BorrowedBook";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";




const Borrowed = () => {
    let {user}=useAuth()
    let axiosCustom=useAxiosIntercepter()
let {isLoading,isFetching,refetch, data}=useQuery({
    queryKey:['borrowedBooks'],queryFn:async()=>await axiosCustom.get(`/borrowedbooks?email=${user.email}`)
})

useEffect(()=>{
    refetch()
},[refetch,user])
if(isLoading||isFetching){
    return(
        <div className=" w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
       </div>
    )
}


if(data?.data?.length<1){
    return(
        
        <h1 className=" text-center font-bold text-lg py-72 px-4">Currently not borrowed</h1>
    )
}


    return (
     <section className="container  mx-auto grid grid-cols-1 gap-10 lg:grid-cols-4 py-20 px-6">
        {data?.data?.map(book=><BorrowedBook refetch={refetch} key={book._id} book={book} ></BorrowedBook>)}
     </section>
    );
};

export default Borrowed;