import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'forum-flax-two.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;