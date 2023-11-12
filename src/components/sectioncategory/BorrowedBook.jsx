import moment from "moment";
import { Link } from "react-router-dom";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";

import toast from "react-hot-toast";


const BorrowedBook = ({book,refetch}) => {
    let {category,name,image,borrowDate,returnDate,_id,id}=book
    let axiosCustom=useAxiosIntercepter()
    let handleDelete =()=>{
        axiosCustom.delete(`/borrowedbooks/${_id}`).then(data=>{
            if (data.data.deletedCount>0){
                axiosCustom.get(`/book/${id}`).then(data=>{
                    axiosCustom.patch('/books',{quantity:(data.data.quantity+1),id:id}).then(data=>{
                        if(data.data.modifiedCount>0){
                            toast.success('Returned Successfully')
                        }
                    })
                })



                refetch()
            }
        })

    }
    return (
        <div>
        <div className="relative rounded-md overflow-hidden">
        <img src={image} alt="Book Image" className="w-full pb-36" />
        <div className="absolute bg-[#ffffffea] bottom-0 w-full p-4">
        <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Name : <span className="text-[#A21942]">{name}</span> </p>
        <p className="flex gap-4 items-center text-[#4b2b53] font-bold">BorrowDate : <span className="text-[#A21942]">{borrowDate}</span> </p>
        <p className="flex gap-4 items-center text-[#4b2b53] font-bold">ReturnDate : <span className="text-[#A21942]">{moment(returnDate).format('ll')}</span> </p>
            <p className="flex gap-4 items-center text-[#4b2b53] font-bold">category : <Link to={`/categories/${category}`} className="text-[#A21942] underline hover:text-[#4b2b53]">{category}</Link> </p>
            <button onClick={handleDelete} className=" font-bold bg-[#f5b53e] hover:bg-[#ffffff] hover:shadow-md mt-7 hover:text-[#4b2b53] shadow-lg px-4 py-2 text-[#2c0f0f] rounded-md w-full"> Return </button>
        </div>
        </div>
    </div> 
    );
};

export default BorrowedBook;