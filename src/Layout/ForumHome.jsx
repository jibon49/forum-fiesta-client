import { FcClock } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import Tags from "../Pages/Home/Tags/Tags";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import like from '/like.png'
import dislike from '/dislike.png'
import comment from '/comments.png'
import share from '/next.png'



const ForumHome = () => {


    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get('/postjson.js')
            return res.data;
        }
    })

    console.log(posts);

    return (
        <>
            <div className="flex justify-between gap-8 max-w-7xl mx-auto mt-10">
                <div className="w-2/3">
                    <h1>forum post</h1>
                    <div>
                        {
                            posts.map(post => <div key={post.id} className="card  bg-base-100 shadow-xl p-10 mb-5 ">
                                <div className="flex gap-5">
                                    <div className="avatar">
                                        <div className="w-14 h-14 rounded-full">
                                            <img src={post.author.avatar} />
                                        </div>
                                    </div>
                                    <div className="">
                                        <h2 className="card-title mb-2">{post.title}</h2>
                                        <p className="text-[#BDC3C7]">{post.description}</p>
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
                    <Outlet></Outlet>
                </div>
                <div className="w-1/3">
                    <Tags></Tags>
                </div>
            </div>
        </>
    );
};

export default ForumHome;