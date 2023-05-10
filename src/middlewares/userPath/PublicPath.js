import store from "../../redux/store";
import { login } from "../../redux/userSlice";
import jwtDecode from "jwt-decode";

export default function PublicRouteUser({children}) {
    const token = localStorage.getItem('userToken');
    if(token){
        const decode = jwtDecode(token)
        store.dispatch(login({
            user:decode.name,
            mobile:decode.mobile,
            token
        }))
        return children
    }
    return children;
}
