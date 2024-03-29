import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import userImg from "/user.png";
import logo from "/logo.png"
import bell from "/notification-bell.png"
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useContext } from "react";
import { FaBell } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
    const axiosPublic = useAxiosPublic()



    const { user, logOut } = useContext(AuthContext)



    const { data: allAnnouncement = [] } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement')
            return res.data;
        }
    })


    const links = <>

        <li><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#5453B9] font-bold" : ""
            }
        >Home</NavLink></li>

        <li><NavLink to='/membership'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Membership</NavLink></li>

        {
            user ? 
            <></>
            :
            <li><NavLink to='/login'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#5453B9] font-bold" : ""
                }
            >Join Us</NavLink></li>
            
        }

        <li><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        ><button className="flex items-center">
        <FaBell className="text-xl"></FaBell>
        <div className="badge badge-secondary">{allAnnouncement.length}</div>
      </button></NavLink></li>



    </>


    const handleLogout = () => {
        logOut();
        localStorage.removeItem('isDataSent')
    }


    return (


        <div className="navbar px-5 sticky top-0 glass z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu-sm dropdown-content text-[#363636] mt-3 z-[1] p-2 bg-base-100 w-52">
                        {links}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img className="w-48" src={logo} alt="" />
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-5 px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <div>
                                <div className="flex-none">
                                    <ul className="menu menu-horizontal px-1">
                                        <li>
                                            <details>
                                                <summary>
                                                    <div className="avatar">
                                                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={user.photoURL} />
                                                        </div>
                                                    </div>
                                                </summary>
                                                <ul className="p-2 bg-base-100">
                                                    <li className="text-center mb-2">{user.displayName}</li>
                                                    <li className="underline"><NavLink to='/dashboard'
                                                    > Dashboard <MdSpaceDashboard></MdSpaceDashboard> </NavLink></li>
                                                    <button onClick={handleLogout} className="btn btn-ghost w-full font-semibold">Logout <MdLogout></MdLogout></button>
                                                </ul>
                                            </details>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <button onClick={handleLogout} className="hover:text-[#16eead] font-semibold">Logout</button>
                        </>
                        :
                        <>
                            <img className="w-10 h-10 mr-5" src={userImg} alt="" />
                            <NavLink to="/login" className="hover:text-[#16eead] font-semibold">Login</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;