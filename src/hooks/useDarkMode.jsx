import { useState } from "react";
import { GiMoonBats } from 'react-icons/gi';
import { FaSun } from 'react-icons/fa';
let body=document.getElementById("MainBody").style



const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const handleDarkMode=()=>{
      setIsDarkMode(!isDarkMode)
    }
if(isDarkMode){
    body.color='#A21942'
    body.background= '#1a0f1d';
      }else{
        body.color='#FAF3F0'
    body.background= '#86A789';
      }
      let darkMode=(
       <>
        <div  className=" bottom-10 left-2 sticky grid  w-24"> 
       <div className=" grid gap-10 mx-auto">
    
       <p className="text-sm font-bold rotate-45">{isDarkMode?'LightMode':'DarkMode'}</p> 
      <br />
          <div className="rotate-90 bg-[#381411] w-12 p-1 flex gap-2 rounded-lg  transition-all ease-in-out absolute top-[70%] right-0" onClick={handleDarkMode}>
          <GiMoonBats></GiMoonBats>
          <FaSun></FaSun>
          <span className={`top-0 w-6 h-full absolute ${isDarkMode?'rounded-l-lg rounded-r-xl  left-0 bg-[#000000]':'rounded-r-lg rounded-l-xl right-0 bg-[#185f6b]'}`}></span>
        </div>
     
       </div>
        </div>

        
        </>)
      return darkMode
  
};


export default useDarkMode;