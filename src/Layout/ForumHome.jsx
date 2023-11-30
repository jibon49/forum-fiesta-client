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
import usePagination from "../Hooks/usePagination";
import { useEffect, useState } from "react";


const ForumHome = () => {

    const axiosPublic = useAxiosPublic()
    const [allPosts, setAllPosts] = useState([])
    


    useEffect(()=>{
        axiosPublic.get('/posts')
        .then(res=>{
            const sortedPosts = res.data.sort((a, b) => new Date(b.time) - new Date(a.time));
            setAllPosts(sortedPosts)
        })
    },[axiosPublic])

    const itemsPerPage = 5;



    const { currentPage, paginatedData, handlePrevious, handleNext, numberOfPages, setCurrentPage } = usePagination(allPosts, itemsPerPage);


    

    
    const pages = [...Array(numberOfPages).keys()];
    
    

    const { data: allAnnouncement = [] } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement')
            return res.data;
        }
    })
    console.log(allAnnouncement)

    
    const handleSort =()=>{
        axiosPublic.get('/posts/sort')
        .then(res=>{
            setAllPosts(res.data)
        })
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
                        <div className="bg-blue-500 flex items-center justify-between">
                            <h1 className=" p-3 font-bold text-white">Forum post
                            </h1>
                            <div>
                                <button
                                    onClick={handleSort}
                                    className="btn px-6">Sort</button>
                            </div>
                        </div>
                        <div>
                            {
                                paginatedData.map(post =>
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

            {/* pagination */}
            <div className="max-w-6xl mx-auto items-center flex mt-20">
                <div className="join mx-auto">

                    <button className="join-item btn mr-2"
                        onClick={handlePrevious}
                    >Previous page</button>
                    {
                        pages.map(number => <button
                            onClick={() => setCurrentPage(number)}
                            key={number} className={`join-item btn ${currentPage === parseInt(number) ? 'bg-[#16eead]' : ''}`}>{number}</button>)
                    }

                    <button
                        onClick={handleNext}
                        className="join-item btn ml-2 rounded-r-lg">Next</button>
                </div>
            </div>

        </>
    );
};

export default ForumHome;