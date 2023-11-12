import { Link } from "react-router-dom";
import Ratting from "../../../components/Ratting";

const Book = ({book}) => {
    let {_id,name,image,author,quantity,rating,category,description}=book
    return (
        <div>
            <div className="relative rounded-md overflow-hidden">
            <img src={image} alt="Book Image" className="w-full pb-36" />
            <div className="absolute bg-[#ffffffea] bottom-0 w-full p-4">
            <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Name : <span className="text-[#A21942]">{name}</span> </p>
                <div  className="flex gap-4 items-center text-[#4b2b53] font-bold">Ratting : <Ratting ratting={rating}></Ratting></div>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Author : <span className="text-[#A21942]">{author}</span> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">Left : <span className="text-[#A21942]">{quantity}</span> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">category : <Link to={`/categories/${category}`} className="text-[#A21942] underline hover:text-[#4b2b53]">{category}</Link> </p>
                <p className="flex gap-4 items-center text-[#4b2b53] font-bold">description : <span className="text-[#A21942]">{description?.slice(0,20) +'...'}</span> </p>
             <Link to={`/book/update/${_id}`}>   <button className=" mt-4 font-bold bg-[#2b2e2a] hover:bg-[#ffffff] hover:shadow-md hover:text-[#4b2b53] px-4 py-2 text-[#ffffff] rounded-md">Update</button></Link>
            </div>
            </div>
        </div>
    );
};

export default Book;