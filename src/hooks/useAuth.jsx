import { useContext } from "react";
import { AuthInfo } from "../context/AuthContext";

const useAuth = () => {
    let auth=useContext(AuthInfo)

 return auth
};

export default useAuth;