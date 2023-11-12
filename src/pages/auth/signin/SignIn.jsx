import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import toast from "react-hot-toast";
import SocialSignIn from "../../../components/auth/SocialSignIn";
import "../auth.css"
import useAuth from "../../../hooks/useAuth";
const Signin = () => {
 let state =useLocation().state
  let [errorText, setErrorText] = useState('');
  let {signIn,setLoading}=useAuth()
  let navigate=useNavigate()

  const handleLogIn=e=>{
    e.preventDefault();
    setErrorText('')
    let email=e.target.email.value
    let password=e.target.password.value
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    ) {
      return setErrorText("please Input Valid Email");
    } else if (
      password.length < 8 ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!*_])[A-Za-z\d@#$%^&+=!*_]{8,}$/.test(
        password
      )
    ) {
      return setErrorText(
        "password must be 8 character long and include special character"
      );
    }
   
    signIn(email,password)
    .then(()=>{
      state?navigate(state):navigate('/')
     
      toast.success('logged In')
   
    })
    .catch((err)=> {setErrorText(err.code.slice(5))
      setLoading(false)})
   
  }
  return (
    
    <div className="container mx-auto flex justify-center items-center h-screen px-4 pt-14 lg:pt-0">
        <Helmet>
        <title>Site || Log In</title>
      </Helmet>
    <div className=" max-w-[600px] w-full border rounded-md border-[#4b2b53]  shadow-2xl" onSubmit={handleLogIn}>
      <form className="grid p-10 bt-0 gap-10">
      <h2 className="py-2 font-semibold text-4xl text-center transTTa">
           Sign In
        </h2>
        <p className="text-[#616169] font-bold text-center"><span className="text-[#581b1b] text-lg">Librarian:</span> Email- <span className=" px-3 text-[blue]">admin@gmail.com</span> pass- <span className="px-3 text-[blue]">4ff#%#@fD</span></p>
        <input
              type="text"
              placeholder="Example@email.com"
              name="email"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] mb-8 rounded-md py-2 px-1  text-center"
            />


<input
              type="password"
              placeholder="Password"
              name="password"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] mb-8 rounded-md py-2 px-1  text-center"
            />
      
<p className="text-[#6d6d6d9a] text-right">Don&apos;t have account? Please <Link className="underline font-semibold transTT transTh" to="/signup" state={state}>Sign Up</Link></p>

{errorText && <p className=" text-[#A21942] py-5">{errorText}</p>}
<input
            className="btn uppercase rounded-lg px-10 bg-gradient-to-l from-[#A21942] to-[#5f0606b6] hover:opacity-75 text-[#1a0f1d] text-lg font-bold text-center  flex mx-auto"
            type="submit"
            value="Sign In"
          />
       
      </form>
      <div className="flex items-center px-10 py-10 gap-4">
  <p className=" font-bold transTT">Or,Sign in with . . .</p><div className="w-40"><SocialSignIn state={state} setErrorText={setErrorText}></SocialSignIn></div>
</div>
    </div>
   
    </div>
  
  );
};

export default Signin;
