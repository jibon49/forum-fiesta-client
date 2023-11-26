import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";


const useUserInfo = () => {

    
    const {user,loading} = useContext(AuthContext)
    let membership = "bronze"

    if(user || !loading){
        const username = user.displayName;
    const userEmail = user.email;
    const userImage = user.photoURL;
    const userJoined = user.metadata.creationTime;
    const userInfo = {username, userEmail, userImage, userJoined, membership};
    return userInfo
    }
    else{
        return {}
    }
};

export default useUserInfo;