import { FcClock } from "react-icons/fc";
import { Link, NavLink, Outlet } from "react-router-dom";
import Tags from "../Pages/Home/Tags/Tags";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import like from '/like.png'
import dislike from '/dislike.png'
import comment from '/comments.png'
import share from '/next.png'
import { FaBullhorn } from "react-icons/fa";
import useAxiosPublic from "../Hooks/AxiosPublic/useAxiosPublic";
import Announcements from "../Pages/Home/Announcements/Announcements";


const ForumHome = () => {

    const axiosPublic = useAxiosPublic()

    const { data: allPosts = [], error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts')
            return res.data;
        }
    })
    const { data: allAnnouncement = [] } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement')
            return res.data;
        }
    })
    console.log(allAnnouncement)

    if (isLoading) {
        <span className="loading loading-ring loading-lg"></span>
    }



    return (
        <>

            <div>
                <div className="max-w-7xl mx-auto border border-b-0">
                    <h1 className="bg-blue-500 p-3 font-bold text-white flex items-center gap-5"><FaBullhorn className="text-4xl"></FaBullhorn> Announcement</h1>
                    <div>
                        {
                            allAnnouncement && 
                            allAnnouncement.map(announce=><Announcements
                                announce={announce}
                                key={announce._id}></Announcements>)
                        }
                    </div>
                </div>


                <div className="flex justify-between gap-8 max-w-7xl mx-auto mt-10">

                    <div className="w-2/3">
                        <div>

                        </div>
                        <h1 className="bg-blue-500 p-3 font-bold text-white">Forum post</h1>
                        <div>
                            {
                                allPosts.map(post =>
                                    <div key={post._id} className="card  bg-base-100 shadow-xl p-10 mb-5 ">
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
                    <div className="w-1/3">
                        <Tags></Tags>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ForumHome;