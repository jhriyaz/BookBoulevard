
import { Toaster } from 'react-hot-toast';
import Navbar from '../../components/header/Navbar';
import { Outlet } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import { useContext } from 'react';
import { AuthInfo } from '../../context/AuthContext';
import Footer from '../../components/Footer';

const MainLayout = () => {
  let {loading}=useContext(AuthInfo)
  let darkMode =useDarkMode()
    return (
   
    <div className=" ">
   
    <Navbar></Navbar>
    <Toaster></Toaster>
      <Outlet></Outlet>
   
      {!loading && darkMode}
      <Footer></Footer>
    </div>
  
    );
};

export default MainLayout;