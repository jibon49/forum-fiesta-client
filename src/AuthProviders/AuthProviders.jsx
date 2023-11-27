import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { app } from "../../firebase_config";
import useAxiosPublic from "../Hooks/AxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            const userEmail = currentUser?.email || user?.email;
            const loggedEmail = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
           
            // if (currentUser) {
            //     let membership = "bronze";
            //     const userName = currentUser.displayName;
            //     const userMail = currentUser.email;
            //     const userPhoto = currentUser.photoURL;
            //     const userJoined = currentUser.metadata.creationTime;
            //     const userInfo = { userName, userMail, userPhoto, userJoined, membership };
            //     console.log(userInfo);
    
            //     try {
            //         axiosPublic.post('/users', userInfo);
            //     } catch (error) {
            //         console.error('Error sending user information to the database:', error);
            //     }
            // }

            

            // if (currentUser) {
            //     axios.post('online-group-study-assignment-server-rcov966xi-jibon49.vercel.app/jwt', loggedEmail,
            //         { withCredentials: true })
            //         .then(res => {
            //             console.log(res.data.success)
            //             if (res.data.success) {
            //                 console.log('successfully created jwt')
            //             }

            //         })
            // }

            // else{
            //     axios.post('online-group-study-assignment-server-rcov966xi-jibon49.vercel.app/logout',loggedEmail, {withCredentials:true})
            //     .then(res=>{
            //         console.log(res)
            //     })
            // }
            
        })
        
        return unSubscribe;
    }, [user?.email])


    const createUser = async (email, password, name, photoUrl) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name, photoURL: photoUrl });
            return result;
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Not cool'
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth)
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const userInfo = {
        user,
        createUser,
        logIn,
        loading,
        logOut,
        updateProfile
    }



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children: PropTypes.object
};

export default AuthProviders;