import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";
import { useQuery } from "react-query";
import Ratting from "../../components/Ratting";
import Swal from "sweetalert2";
import DatePicker from 'react-date-picker';
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { AuthInfo } from "../../context/AuthContext";
import moment from "moment";
import Error from "../Error/Error";

const SingleBook = () => {
    const [value, onChange] = useState(new Date());
    const [borrowed,setBorrwed]=useState({})
    const id=useParams().id
    let navigate=useNavigate()
  let axiosCustom =useAxiosIntercepter()
let {user}=useContext(AuthInfo)
let {data:singleBook,isLoading,isFetching,error,refetch}=useQuery({
    queryKey:['singleBook'],
    queryFn:async ()=>await axiosCustom.get(`/book/${id}`)
})

let checkBorrowed=Boolean(borrowed)

    useEffect(()=>{
      refetch()
        axiosCustom.get(`/borrowedBook/${id}?email=${user.email}`).then(data=>setBorrwed(data.data))
    },[axiosCustom,id,user.email,refetch])









let handleDelete=()=>{


    Swal.fire({
        title: "Are you sure want to update?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosCustom.delete(`/book/${id}`)
            .then(data=>{
               if(data.data.deletedCount>0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                  navigate('/')
         
        }
      
      });




}

})

  
}
  
if(isLoading||isFetching){
    return(
        <div className=" w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
       </div>
    )
}


if(error){
    return(
    <Error></Error>
    )
}
let{_id,image,name,quantity,author,category,description,rating}=singleBook.data
let handleBorrow=()=>{

  let borrowData={email:user.email,user:user.displayName,id:_id,returnDate:value,borrowDate:moment().format('ll'),category,name,image}

  axiosCustom.post(`/borrowedBook`,borrowData).then(data=>{

      if(data.data.insertedId){
          setBorrwed({me:'Borrow Successful'})
          axiosCustom.patch('/books',{quantity:(quantity-1),id:_id}).then(data=>{
            if(data.data.modifiedCount>0){
              refetch()
              return  toast.success('Borrow Successful')
            }
          })


            
      
      }
      else{
          toast.error('Already Added')
      }
      }
      )




}

    return (
       <>
       <section className="container mx-auto grid grid-cols-1 lg:grid-cols-4 lg:gap-40 gap-10 bg-[#ffffffea]  p-10 rounded-md items-center mt-10 pb-10">
<div className=" col-span-1">
<img src={image} alt="Book Image" className=" lg:w-80 rounded-md p-8" />
</div>
<div className="col-span-1 lg:col-span-3">
<div className=" bottom-0 w-full grid gap-6">
            <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Name : <span className="text-[#A21942]">{name}</span> </p>
              <div  className="flex gap-4 items-center text-[#4b2b53] font-bold">Ratting : <Ratting ratting={rating}></Ratting></div>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Author : <span className="text-[#A21942]">{author}</span> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Left : <span className="text-[#A21942]">{quantity}</span> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">category : <Link to={`/categories/${category}`} className="text-[#A21942] underline hover:text-[#4b2b53]">{category}</Link> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">description : <span className="text-[#A21942]">{description?.slice(0,20) +'...'}</span> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Description: <span className="text-[#A21942]">{description}</span> </p>
            </div>


    

</div>


       </section>
{/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box h-[60%] min-w-screen bg-slate-400 text-[#4b2b53] text-left p-10">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
   <div>
    <img className=" p-5 flex justify-center mx-auto rounded-md w-56" src={image} alt="" />
   <h3 className="font-bold text-lg pb-10 text-center text-[#A21942]">{name}</h3>

   </div>

    <div className="flex items-center gap-5 pb-4">
        <h4 className=" font-bold text-lg">Return Date : </h4>
      <DatePicker onChange={onChange} value={value} />
    </div>
   <div className="flex items-center gap-5 pb-8">
   <h4 className=" font-bold text-lg">Author : </h4>
   <p>{author}</p>
   </div>
    <button onClick={handleBorrow} className=" mt-2 font-bold bg-slate-600 hover:bg-[#ffffff] hover:shadow-md hover:text-[#4b2b53] px-4 py-2 text-[#a8a8a8] rounded-sm">Borrow</button>
  </div>
</dialog>

       <div className="flex gap-10 items-center justify-center py-10">
      {
        !(checkBorrowed || quantity===0)? <button  onClick={()=>document.getElementById('my_modal_3').showModal()} className={`mt-2 font-bold  hover:bg-[#ffffff] hover:shadow-md hover:text-[#4b2b53] px-4 py-2 bg-[#8c3f82] text-[#e2e2e2] rounded-md `}> Borrow </button>: <button disabled onClick={()=>document.getElementById('my_modal_3').showModal()} className={`mt-2 font-bold bg-[#2f302e7a]    px-4 py-2 text-[#a8a8a8] rounded-md `}> Borrow </button>
      }
       <Link to={`/books/read/${_id}`}>   <button className=" mt-2 font-bold hover:bg-[#ffffff] hover:shadow-md hover:text-[#4b2b53] px-4 py-2  bg-[#8c3f82] text-[#e2e2e2] rounded-md"> Read</button></Link>
       
     
       <button   onClick={handleDelete} className=" mt-2 font-bold bg-[#c21d547a] hover:bg-[#e74a4ac7] hover:shadow-md hover:text-[#111111] px-4 py-2 text-[#cdc9c9] rounded-md"> Delete</button>
       
       </div>
       
       
       </>

    );
};

export default SingleBook;