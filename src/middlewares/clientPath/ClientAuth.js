import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import jwtDecode from "jwt-decode";
import { client_login } from "../../redux/clientSlice";

export default function AuthorizeClient({children}) {
    const token = localStorage.getItem('clientToken');
    if(!token){
        return <Navigate to={'/clientlogin'} />
    }else{
        const decode = jwtDecode(token);
        store.dispatch(client_login({
            user:decode.name,
            token
        }))
        return children;
    }
    
}

