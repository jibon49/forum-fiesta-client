import { NavLink, useLoaderData } from "react-router-dom";
import like from '/like.png'
import dislike from '/dislike.png'
import comment from '/comments.png'
import share from '/next.png'
import { FcClock } from "react-icons/fc";


const PostDetails = () => {

    const data = useLoaderData()
   
    console.log(data)
    const {id, author, title, description,tag, time, commentsCount,votesCount} = data


    return (
        <div>
            <div key={"id"} className="card  bg-base-100 shadow-xl p-10 mb-5 ">
                <div className="flex gap-5">
                    <div className="avatar">
                        <div className="w-14 h-14 rounded-full">
                            <img src={"author"} />
                        </div>
                    </div>
                    <div className="">
                        <h2 className="card-title mb-2">{"title"}</h2>
                        <p className="text-[#BDC3C7]">{"description"}</p>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-center justify-around">
                    <div className="flex items-center gap-10">
                        <div className="flex gap-2 items-center">
                            <button><img className="w-5" src={like} alt="" /></button>
                            <p className="text-green-500">{"votesCount.upvotes"}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button><img className="w-6" src={dislike} alt="" /></button>
                            <p className="text-red-500">{"post.votesCount.downvotes"}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FcClock className="text-2xl"></FcClock>
                            <p className="text-[#BDC3C7]">{"time"}</p>
                        </div>

                    </div>
                    <div className="flex gap-2">

                        <div className="flex gap-2 items-center mr-5">
                            <p className="text-[#BDC3C7]">{"tag"}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button><img className="w-5" src={comment} alt="" /></button>
                            <p className="text-red-500">{"commentsCount"}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button><img className="w-5" src={share} alt="" /></button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;