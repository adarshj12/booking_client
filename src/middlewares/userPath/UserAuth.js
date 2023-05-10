import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import jwtDecode from "jwt-decode";
import { login } from "../../redux/userSlice";

export default function AuthorizeUser({children}) {
    const token = localStorage.getItem('userToken');
    if(!token){
        return <Navigate to={'/login'} />
    }else{
        const decode = jwtDecode(token);
        store.dispatch(login({
            user:decode.name,
            mobile:decode.mobile,
            token
        }))
        return children;
    }
    
}

