import { useContext } from "react";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../AuthProviders/AuthProviders";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const [user, loading] = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();


    if(loading || isAdminLoading){
        return <span className="loading loading-spinner mx-auto flex loading-lg"></span>
    }

    if(user && isAdmin){
        return children
    }

    return (
        <Navigate state={location.pathname} to='/statusError'></Navigate>
    );
};

export default AdminRoute;