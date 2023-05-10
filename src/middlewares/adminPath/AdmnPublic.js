import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { loginAdmin } from "../../redux/adminSlice";
import jwtDecode from "jwt-decode";

export default function PublicRouteAdmin({children}) {
    const token = localStorage.getItem('adminToken');
    if(token){
        const decode = jwtDecode(token)
        store.dispatch(loginAdmin({
            user:decode.name,
            token
        }))
        return <Navigate to={'/admin/adminDashboard'} />
    }
    return children;
}
