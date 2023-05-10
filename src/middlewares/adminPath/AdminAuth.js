import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import jwtDecode from "jwt-decode";
import { loginAdmin } from "../../redux/adminSlice";

export default function AuthorizeAdmin({children}) {
    const token = localStorage.getItem('adminToken');
    if(!token){
        return <Navigate to={'/admin'} />
    }else{
        const decode = jwtDecode(token);
        store.dispatch(loginAdmin({
            user:decode.name,
            token
        }))
        return children;
    }
    
}

