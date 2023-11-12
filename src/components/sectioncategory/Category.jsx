import { Link } from "react-router-dom";

const Category = ({category}) => {
   
let {categoryName,relevantImage}=category
    return (
       
      <div className="text-center bg-slate-900 grid gap-2 p-6">
<img src={relevantImage} alt="Category Image" className=" rounded-md"  />
<h3 className=" text-slate-500 text-lg">{categoryName}</h3>
<Link to={`/categories/${categoryName}`}><button className=" bg-slate-300 px-4 py-2 rounded-md font-bold hover:bg-slate-500 hover:text-green-500">Explore</button></Link>
      </div>
    )
};

export default Category;