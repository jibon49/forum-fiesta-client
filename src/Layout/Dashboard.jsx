import { NavLink, Outlet } from "react-router-dom";
import logo from "/logo.png"
import { FaHome, FaListUl, FaMedal, FaPen, FaUser, FaUsers } from "react-icons/fa";
import { IoIosAlert, IoIosDocument } from "react-icons/io";
import { FaBullhorn, FaPerson } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();


    return (
        <div className="flex">
             <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-row md:flex-col items-center  justify-start md:justify-normal">
                    {/* Page content here */}
                    <div>
                        <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><FaListUl></FaListUl></label>
                    </div>
                    <div className="w-full p-10">
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-[#2B2A3F] text-[#BCBBC7]">
                        <img className="mb-10" src={logo} alt="" />
                        <hr className="mb-10" />
                        {/* Sidebar content here */}
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink to='adminProfile'>
                                            <FaUser></FaUser> Admin Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='manageUsers'>
                                            <FaPen></FaPen> Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='reportedComments'>
                                            <IoIosAlert></IoIosAlert> Reported Comments
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='makeAnnouncement'>
                                            <FaBullhorn>
                                            </FaBullhorn>
                                            Make Announcement
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to='my-profile'>
                                            <FaUser></FaUser> My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='ad-post'>
                                            <FaPen></FaPen> Ad Post
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='my-post'>
                                            <IoIosDocument></IoIosDocument> My Post
                                        </NavLink>
                                    </li>
                                </>
                        }
                        <hr className="my-10" />
                        <>
                            <li><NavLink to='/'
                            ><FaHome></FaHome> Home</NavLink></li>

                            <li><NavLink to='/membership'
                            ><FaMedal></FaMedal> Membership</NavLink></li>

                            <li><NavLink to='/join-us'
                            ><FaUsers></FaUsers> Join Us</NavLink></li>

                        </>

                    </ul>

                </div>

            </div>


        </div >
    );
};

export default Dashboard;