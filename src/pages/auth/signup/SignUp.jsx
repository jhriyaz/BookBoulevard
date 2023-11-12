import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../auth.css";
import { useContext, useState } from "react";
import { AuthInfo } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import SocialSignIn from "../../../components/auth/SocialSignIn";
const SignUp = () => {
 
  let [errorText, setErrorText] = useState("");
  let { signUp, updateProf,setLoading} = useContext(AuthInfo);
  let navigate = useNavigate();
  let state = useLocation().state;
  
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorText('')
    let name = e.target.name.value;
    let email = e.target.email.value;
    let photo=e.target.photo.value;
    let password = e.target.password.value;
    let repass = e.target.rePassword.value;
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
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
        "password must be 8 character long and include special character ,letters (both capital and small) and number"
      );
    } else if (password !== repass) {
      return setErrorText("Password and repeat password should be same");
    }
else if(name.length<3){
  return setErrorText("Name should be at least 3 character");
}   
signUp(email, password)
      .then(()=>{
        updateProf(name,photo)
        .then(()=>{
          toast.success('Registration successful')
          state?navigate(state):navigate('/')
        })
        .catch(err=>{
          toast.error(err.code.slice(5))
          setLoading(false)
        })
      })
      .catch(err=>{
        toast.error(err.code.slice(5))
        setLoading(false)
      })
     
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-screen px-4 pt-14 lg:pt-0">
        <Helmet>
        <title>site|| Register</title>
      </Helmet>
      <div className=" max-w-[600px] w-full border rounded-lg border-[#4b2b53] shadow-xl">
        <form className="grid p-10 pb-0 gap-10" onSubmit={handleRegister}>
          <h2 className="py-2 font-semibold text-4xl text-center transTTa">
            Register
          </h2>
          <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center"
            />
          <input
              type="text"
              placeholder="Photo Link"
              name="photo"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center"
            />

<input
              type="text"
              placeholder="Example@email.com"
              name="email"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center"
            />

<input
              type="password"
              placeholder="Password"
              name="password"
              className="border-0 outline-none border-b-4 focus:border-[#A21942] border-[#4b2b53] rounded-md py-2 px-1  text-center"
            />

<input
              type="password"
              placeholder="Repeat Password"
              name="rePassword"
              className="border-0 outline-none border-b-4 focus:border-[#A21942]  border-[#4b2b53] rounded-md py-2 px-1  text-center"
            />

          <p className="text-[#6d6d6d9a] text-right">
            Already got account? Please{" "}
            <Link
              className="underline font-semibold transTT transTh"
              to="/signin"
              state={state}
            >
              Sign In
            </Link>
          </p>

          {errorText && <p className=" text-[#A21942] py-5">{errorText}</p>}
          <input
            className="btn uppercase rounded-lg px-10 bg-gradient-to-l from-[#A21942] to-[#5f0606b6] hover:opacity-75 text-[#1a0f1d] text-lg font-bold text-center  flex mx-auto"
            type="submit"
            value="Sign Up"
          />
        </form>
        <div className="flex items-center px-10 py-10 gap-4">
  <p className=" font-bold transTT">Or,Continue with . . .</p><div className="w-40"><SocialSignIn state={state} setErrorText={setErrorText}></SocialSignIn></div>
</div>
      </div>
    </div>
  );
};

export default SignUp;
