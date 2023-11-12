import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";

const Addbook = () => {
    const axiosCustom=useAxiosIntercepter()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm()
      const onSubmit = (dataaaa) => {
if(dataaaa.category==='category'){
    toast.error('Select category')
     return
}
axiosCustom.post('/books',dataaaa)
 .then(data=>{
    if(data.data.insertedId){
toast.success('Added Successfully')
reset()
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
          <input className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Book Name" required
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
      
          {errors.name?.type === "required" && (
            <p role="alert">Book Name is required</p>
          )}
    
    <input className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Cover Image link" required
            {...register("image", { required: true })}
            aria-invalid={errors.image ? "true" : "false"}
          />
          
          {errors.image?.type === "required" && (
            <p role="alert">Cover Image link is required</p>
          )}

<input required className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center" placeholder="Author"
            {...register("author", { required: true })} 
            aria-invalid={errors.author ? "true" : "false"}
          />
          
          {errors.author?.type === "required" && (
            <p role="alert">Author name required</p>
          )}


   <div className="flex gap-2  justify-center items-center">
<div>
<input className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center w-full" placeholder="Quantity" max={100}  min={0} type="number"
            {...register("quantity", { required: true })} required
            aria-invalid={errors.quantity ? "true" : "false"}
          />
          
          {errors.quantity?.type === "required" && (
            <p role="alert">quantity is required</p>
          )}

</div>



<div>
<input  required className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center w-full" placeholder="Ratting" max={5}  min={0} type="number"
            {...register("rating", { required: true })}
            aria-invalid={errors.rating ? "true" : "false"}
          />
          
          {errors.rating?.type === "required" && (
            <p role="alert">Ratting is required</p>
          )}
</div>






<div >


<select {...register("category" , { required: true })} id="category" className="border-0 text-slate-400 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-3 px-1  text-center w-full">
  
        <option   defaultValue="category">Category</option>
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


<textarea  {...register("description" , { required: true })}   required className="textarea  textarea-warning resize-none focus:border-[#A21942] border-[#4b2b53] border-0 focus:border-0  outline-none" placeholder="Short Description"></textarea>
{errors.description?.type === "required" && (
            <p role="alert">description is required</p>
          )}
<textarea  {...register("sneakPeek" , { required: true })}   required className="textarea  textarea-warning resize-none focus:border-[#A21942] border-[#4b2b53] border-0 focus:border-0  outline-none" placeholder="Short Description"></textarea>
{errors.sneakPeek?.type === "required" && (
            <p role="alert">sneakPeek is required</p>
          )}
  












    
          <input className="btn uppercase rounded-lg px-10 bg-gradient-to-l from-[#A21942] to-[#5f0606b6] hover:opacity-75 text-[#1a0f1d] text-lg font-bold text-center  flex mx-auto"
           type="submit" defaultValue="Add Book" />
        </form>


  
      </div>
      </div>
      )
};

export default Addbook;