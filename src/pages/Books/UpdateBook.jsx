import { useForm } from "react-hook-form"

import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'







const UpdateBook = () => {
    const axiosCustom=useAxiosIntercepter()

let data=useLoaderData()





let {_id,image,name,quantity,author,category,description,rating,sneakPeek}=data
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      const onSubmit = (updateData) => {


        Swal.fire({
            title: "Are you sure want to update?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, updated it!"
          }).then((result) => {


            if (result.isConfirmed) {
                axiosCustom.put(`/book/${_id}`,updateData)
                .then(data=>{
                    console.log(data)
                   if(data.data.modifiedCount>0){
                    Swal.fire({
                        title: "Updated!",
                        text: "Your file has been updated.",
                        icon: "success"
                      });

             
            }
          });




    }
  
 })
 }




    return (
        <div className="container mx-auto flex justify-center items-center h-screen px-4 lg:pt-0 mt-24">
        <div className=" max-w-[800px]  lg:p-10 w-full border rounded-lg border-[#4b2b53] shadow-xl">
            <h2 className="py-2 font-semibold text-4xl text-center transTTa">
            Add a Book
          </h2>
 <form className="grid p-10 pb-0 gap-10" onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue={name} className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Book Name" required
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          
          {errors.name?.type === "required" && (
            <p role="alert">Book Name is required</p>
          )}
    
    <input defaultValue={image} className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Cover Image link" required
            {...register("image", { required: true })}
            aria-invalid={errors.image ? "true" : "false"}
          />
          
          {errors.image?.type === "required" && (
            <p role="alert">Cover Image link is required</p>
          )}

<input defaultValue={author} required className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Author"
            {...register("author", { required: true })} 
            aria-invalid={errors.author ? "true" : "false"}
          />
          
          {errors.author?.type === "required" && (
            <p role="alert">Author name required</p>
          )}


   <div className="flex gap-2  justify-center items-center">
<div>
<input defaultValue={quantity} className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center w-full" placeholder="Quantity" max={100}  min={0} type="number"
            {...register("quantity", { required: true })} required
            aria-invalid={errors.quantity ? "true" : "false"}
          />
          
          {errors.quantity?.type === "required" && (
            <p role="alert">quantity is required</p>
          )}

</div>



<div>
<input defaultValue={rating}  required className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center w-full" placeholder="Ratting" max={5}  min={0} type="number"
            {...register("rating", { required: true })}
            aria-invalid={errors.rating ? "true" : "false"}
          />
          
          {errors.rating?.type === "required" && (
            <p role="alert">Ratting is required</p>
          )}
</div>






<div >


<select defaultValue={category} {...register("category" , { required: true })} id="category" className="border-0 text-slate-400 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-3 px-1  text-center w-full">
  
      
        <option value="Novel">Novel</option>
        <option value="Thriller">Thriller</option>
        <option value="History">History</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Arts & Music">Arts & Music</option>
        <option value="Business Careers">Business Careers</option>
        <option value="Comics">Comics</option>
        <option value="Romance">Romance</option>
        <option value="sports">sports</option>
      </select>
    
      {errors.category?.type === "required" && (
            <p role="alert">category is required</p>
          )}
</div>



   </div>


<textarea defaultValue={description}  {...register("description" , { required: true })}   required className="textarea  textarea-warning resize-none focus:border-[#A21942] border-[#4b2b53] border-0 focus:border-0  outline-none" placeholder="Short Description"></textarea>
{errors.description?.type === "required" && (
            <p role="alert">description is required</p>
          )}
<textarea  defaultValue={sneakPeek} {...register("sneakPeek" , { required: true })}   required className="textarea  textarea-warning resize-none focus:border-[#A21942] border-[#4b2b53] border-0 focus:border-0  outline-none" placeholder="Short sneakPeek"></textarea>
{errors.sneakPeek?.type === "required" && (
            <p role="alert">sneakPeek is required</p>
          )}
  



    
          <input className="btn uppercase rounded-lg px-10 bg-gradient-to-l from-[#A21942] to-[#5f0606b6] hover:opacity-75 text-[#1a0f1d] text-lg font-bold text-center  flex mx-auto"
           type="submit" defaultValue="Add Book" />
        </form>


  
      </div>
      </div>
    );
};

export default UpdateBook;