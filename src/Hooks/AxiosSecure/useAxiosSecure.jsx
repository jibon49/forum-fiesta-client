import axios from "axios";
import { useNavigate } from "react-router-dom";


export const axiosSecure = axios.create({
    baseURL: 'forum-flax-two.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    function (error){
        return Promise.reject(error)
    });


    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, (error)=>{
        const status = error.response.status;
        console.log('error in interceptor', status)
        if(status === 401 || status ===403){
            navigate('/statusError')
        }
        return Promise.reject(error);
    })



    return axiosSecure;
};

export default useAxiosSecure;