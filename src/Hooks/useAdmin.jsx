import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAxiosSecure from "./AxiosSecure/useAxiosSecure";


const useAdmin = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    console.log(user)

    const { data : isAdmin, isPending : isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;