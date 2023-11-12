import PropTypes from "prop-types";
import { AiOutlineGoogle,AiOutlineGithub } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthInfo } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const SocialSignIn = ({state,setErrorText}) => {
    let navigate=useNavigate()
    let {signInWithGoogle,signInWithGithub,setLoading}=useContext(AuthInfo)
    let handleSignIn=handle=>{
        setErrorText('')
        handle()
        .then(()=>{
            state?  navigate(state):navigate('/')
            toast.success('logged In')
          })
          .catch((err)=> {setErrorText(err.code.slice(5))
            setLoading(false)
        })
    }
    return (
        <div className="grid grid-cols-3 gap-6">
          <button onClick={()=>handleSignIn(signInWithGoogle)}> <AiOutlineGoogle className="hover:text-[#4b2b53] text-[#A21942] font-extrabold text-4xl"></AiOutlineGoogle></button>
          <button onClick={()=>handleSignIn(signInWithGithub)}><AiOutlineGithub className="hover:text-[#4b2b53] text-[#A21942] font-extrabold text-4xl" ></AiOutlineGithub></button>
        </div>
    );
};
SocialSignIn.propTypes={
    state:PropTypes.string,
    setErrorText:PropTypes.func
}
export default SocialSignIn;