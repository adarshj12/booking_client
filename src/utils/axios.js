import axios from "axios";
import { adminBaseUrl, baseUrl } from "./API";


const instance= axios.create({
    baseURL:baseUrl,
    
})

const adminInstance=axios.create({
    baseURL:adminBaseUrl
})


adminInstance.interceptors.request.use((config)=>{
    const adminToken=localStorage.getItem('adminToken');
    if(adminToken){
        config.headers.Authorization=`Bearer ${adminToken}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})




export default instance
export {adminInstance}