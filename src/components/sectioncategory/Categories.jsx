
import { useEffect } from 'react';
import useAxiosIntercepter from '../../hooks/useAxiosIntercepter';
import Category from './Category';
import { useQuery } from 'react-query';
import Error from '../../pages/Error/Error';

const Categories = () => {
    const axiosCustom=useAxiosIntercepter()
 
let {isFetching,isLoading,data,refetch,error}= useQuery({
    queryKey:['Categories'],
    queryFn:async()=>{
        return await axiosCustom.get(`/categories`)
    }
})
  
useEffect(()=>{
        refetch()
},[refetch])

if(error){
    return(
    <Error></Error>
    )
}

if(isLoading||isFetching){
    return(
       <div className="bg-[#4b2b53] z-auto w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
       </div>
    )
}
    return (
        <section className="container mx-auto mt-24 px-4">
        <div className="flex items-center justify-between bg-[#1f1e1e94] rounded-md p-4">
            <h1 className=" text-lg font-bold uppercase">Some Popular Categories </h1>
            
        </div>
<div className="grid lg:grid-cols-4 grid-cols-1 gap-4 p-4">
{
   data?.data?.map(category=><Category key={category._id} category={category}></Category>)
}
</div>
       </section>
    );
};

export default Categories;