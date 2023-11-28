import { useContext, useEffect, useState } from "react";
import like from '/like.png'
import dislike from '/dislike.png'
import comment from '/comments.png'
import share from '/next.png'
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FcClock } from "react-icons/fc";


const MyProfile = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [myInfo, setMyInfo] = useState([])


    let email = "mymail";

    if (!loading) {
        email = user.email
    }



    const url = `/my-posts?email=${email}`

    const { data: myPosts = [], refetch, error, isLoading } = useQuery(
        {
            queryKey: ['myPosts', email],
            queryFn: async () => {
                const response = await axiosSecure.get(url, { credentials: 'include' });
                return response.data;
            }
        }
    );

    const recentPost = myPosts.slice(-3)

    console.log(myPosts)

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/users?email=${user.email}`)
                .then(res => {
                    console.log(res.data)
                })
        }
    }, [axiosSecure, user])

    return (
        <div>

            <div className="bg-blue-500 mt-10 h-20">
                <h1 className="text-2xl p-5 text-white">My Profile</h1>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={user.photoURL} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{email}</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>

                </div>
            </div>


            <div className="bg-blue-500 mt-10 h-20">
                <h1 className="text-2xl p-5 text-white">Recent Post</h1>
            </div>
            <div>
                <div className="">
                    <div>
                        {
                            recentPost.map(post =>
                                <div key={post._id} className="card  bg-base-100 shadow rounded-none p-10 mb-5 ">
                                    <div className="flex gap-5">
                                        <div className="avatar">
                                            <div className="w-14 h-14 rounded-full">
                                                <img src={post.author.avatar} />
                                            </div>
                                        </div>
                                        <div className="">
                                            <h2 className="card-title mb-2">{post.title}</h2>
                                            <p className="text-[#BDC3C7]">{post.description.slice(0, 200)}</p>
                                            <span className="text-blue-700"> <Link to={`/post-details/${post._id}`}>Read more...</Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="flex items-center justify-around">
                                        <div className="flex items-center gap-10">
                                            <div className="flex gap-2 items-center">
                                                <button><img className="w-5" src={like} alt="" /></button>
                                                <p className="text-green-500">{post.votesCount.upvotes}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <button><img className="w-6" src={dislike} alt="" /></button>
                                                <p className="text-red-500">{post.votesCount.downvotes}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <FcClock className="text-2xl"></FcClock>
                                                <p className="text-[#BDC3C7]">{post.time}</p>
                                            </div>

                                        </div>
                                        <div className="flex gap-2">

                                            <div className="flex gap-2 items-center mr-5">
                                                <p className="text-[#BDC3C7]">{post.tag}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <button><img className="w-5" src={comment} alt="" /></button>
                                                <p className="text-red-500">{post.commentsCount}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <button><img className="w-5" src={share} alt="" /></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;