import { useContext, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaComment, FaEnvelope, FaGlobe, FaTwitter, FaUser } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import Chart from "../Chart/Chart";



const AdminProfile = () => {

    const axiosSecure = useAxiosSecure()
    const [usersCount, setUsersCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [postsCount, setPostsCount] = useState(0)

    const lightBlueGradient = "bg-gradient-to-r from-blue-300 to-blue-100";

    const { user } = useContext(AuthContext)


    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsersCount(res.data.length)
            })
        axiosSecure.get('/posts')
            .then(res => {
                setPostsCount(res.data.length)
            })
        axiosSecure.get('/allComments')
            .then(res => {
                setCommentCount(res.data.length)
            })

    }, [axiosSecure])






    return (
        <div className="">

            <div className="flex justify-evenly">
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                    <img src={user.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                    <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                        <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold sm:text-2xl">{user.displayName}</h2>
                            <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user.email}</p>
                        </div>
                        <div className="flex justify-center pt-2 space-x-4 align-center">
                            <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                                <FaGithub></FaGithub>
                            </a>
                            <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                                <FaGlobe></FaGlobe>
                            </a>
                            <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                                <FaTwitter></FaTwitter>
                            </a>
                            <a rel="noopener noreferrer" href="#" aria-label="Email" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                                <FaEnvelope></FaEnvelope>
                            </a>
                        </div>
                    </div>
                </div>

                <Chart
                    commentCount={commentCount}
                    usersCount={usersCount}
                    postsCount={postsCount}
                ></Chart>
            </div>

            <section className="p-6 my-6 dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">


                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 bg-gradient-to-r from-green-400 to-blue-500 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <IoDocument className="text-4xl"></IoDocument>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{postsCount}</p>
                            <p className="capitalize">Posts</p>
                        </div>
                    </div>


                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% to-light-indigo-300  dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaUser className="text-4xl"></FaUser>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{usersCount}</p>
                            <p className="capitalize">Users</p>
                        </div>
                    </div>


                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaComment className="text-4xl"></FaComment>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{commentCount}</p>
                            <p className="capitalize">Comments</p>
                        </div>
                    </div>
                </div>
            </section>

            <form className="">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="text-xl font-semibold">Add Tag</span>
                    </label>
                    <input type="text" name="title" placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    <button className=" btn btn-outline w-1/3 mb-2">
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AdminProfile;