import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { AuthInfo } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const {user,logOut}=useContext(AuthInfo)

  let [expand, setExpand] = useState(false);
  let handleSignOut=()=>{
    logOut()
    .then(()=>{
      toast.success('Log Out complete')
      setExpand(false)
    })
    .catch(err=> toast.error(err))
  }
  
  // expand menu in mobile device
  const handleExpand=()=>{
    setExpand(!expand)
}
  let navItems = (
    <>
      <li>
        <NavLink to="/" onClick={handleExpand}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-book" onClick={handleExpand}>Add Book</NavLink>
      </li>
      <li>
        <NavLink to="/all-book" onClick={handleExpand}>All Books</NavLink>
      </li>
      <li>
        <NavLink to="/borrowed-book" onClick={handleExpand}>Borrowed Books</NavLink>
      </li>
    </>
  );

let Signin;
  if(user){
Signin=<div className="  flex justify-center items-center gap-4 lg:flex-row flex-row-reverse">
<img src={user?.photoURL}  alt="Profile Photo"  className="rounded-full border-[#4b2b53]  border-2 w-11 h-11"/>
<div className="flex flex-col justify-center ">
<p className=" uppercase font-semibold">{ user?.displayName}</p>
<p className="  text-center mx-auto text-xs font-bold"><button  className={`transTh transTT`} onClick={handleSignOut}>Sign Out</button></p>
</div>
</div>
  }else{
Signin=<Link to="/signin"className="px-8 py-4 bg-[#A21942] hover:bg-[#a21942ad] font-bold rounded-md text-[#1a0f1d]" >Sign In</Link>
  }


  return (
    <>
      <nav className="hidden justify-between items-center shadow-2xl lg:flex p-4">
        <Link to="/">
          <img src={logo} alt="Logo" className=" w-24" />
        </Link>
        <ul className="flex font-bold deskMenu">{navItems}</ul>
        {Signin}
      </nav>

      <nav className="lg:hidden px-2 pt-2">
        <div className="flex justify-between items-center shadow-2xl ">
          <label tabIndex={0} className="btn btn-ghost" onClick={handleExpand}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <Link to="/">
            <img src={logo} alt="Logo" className=" w-24" />
          </Link>

          {Signin}
        </div>
        <ul
          className={`mt-1 font-bold mobileMenu pt-4 ${expand ? "" : "hidden"}`}
        >
          {navItems}
        </ul>
      </nav>
      
    </>
  );
};

export default Navbar;
