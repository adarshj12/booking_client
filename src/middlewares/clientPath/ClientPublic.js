import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { client_login } from "../../redux/clientSlice";
import jwtDecode from "jwt-decode";

export default function PublicRouteClient({children}) {
    const token = localStorage.getItem('clientToken');
    if(token){
        const decode = jwtDecode(token)
        store.dispatch(client_login({
            user:decode.name,
            token
        }))
        return <Navigate to={'/client'} />
    }
    return children;
}
