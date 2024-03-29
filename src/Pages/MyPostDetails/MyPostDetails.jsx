import { Link, useLoaderData, useParams } from "react-router-dom";
import like from '/like.png'
import dislike from '/dislike.png'
import comment from '/comments.png'
import share from '/next.png'
import { FcClock, FcHighPriority } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure"
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import { FacebookShareButton } from "react-share";
import Swal from "sweetalert2";


const MyPostDetails = () => {


    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [userDetails, setUserDetails] = useState()
    const [shareUrl, setShareUrl] = useState(window.location.href);
    const [reportClicked, setReportClicked] = useState(false)
    const [reportedComment, setReportedComment] = useState('')

    const [feedbacks, setFeedbacks] = useState({ action: 'none', commentId: '', userComment:'' });

    const { id } = useParams();
    const post = useLoaderData();

    const { _id, author, title, description, tag, time, commentsCount, votesCount } = post

    const { upvotes } = votesCount

    const [likes, setLikes] = useState(upvotes)
    const [disLikes, setDislikes] = useState(votesCount.downvotes)

    const url = `/comments?postId=${post.postId}`
    console.log(post.postId)

    const { data: allComments = [], refetch, error, isLoading } = useQuery(
        {
            queryKey: ['commentOnPost', post.postId],
            queryFn: async () => {
                const response = await axiosPublic.get(url, { credentials: 'include' });
                return response.data;
            }
        }
    );

    console.log(shareUrl)



    useEffect(() => {
        axiosPublic.get(`/users/${author?.email}`)
            .then(res => setUserDetails(res.data))

    }, [axiosPublic, author.email])



    console.log(allComments);

    const handleUpVote = async () => {
        try {
            const response = await axiosPublic.patch(`/posts/${_id}`, {
                "upvotes": likes + 1,
                "downvotes": disLikes
            });
            console.log(response.data);
            setLikes(likes + 1);
            refetch();
        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };

    const handleDownVote = async () => {
        try {
            const response = await axiosPublic.patch(`/posts/${_id}`, {
                "upvotes": likes,
                "downvotes": disLikes + 1,
            });
            console.log(response.data);
            setDislikes(disLikes + 1);
            refetch();
        } catch (error) {
            console.error('Error updating dislike count:', error);
        }
    };

    const feedbacksReport = {
        reportedBy: author,
        subject: feedbacks.action,
        commentId: feedbacks.commentId,
        comment : feedbacks.userComment

    }

    console.log(feedbacksReport)

    const handleReport = (id) => {
        console.log('handle report clicked', id)
        axiosSecure.post(`/comments/reported/${id}`, feedbacksReport)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Reported",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setReportClicked(true)
                }
            })

    }

    const handleFeedbackSelect = (commentId, feedback, comment) => {
        setFeedbacks({ action: feedback, commentId: commentId, userComment : comment })



    };
    console.log(feedbacks)






    return (
        <div className="max-w-6xl mx-auto mt-20">
            <div className="bg-blue-500 h-16 flex items-center text-white">
                <h1 className="text-2xl p-5">Post</h1>
            </div>

            {/* post and profile */}
            <div className="flex  mx-auto">
                <div className="card w-1/3 bg-base-100 border rounded-none">

                    <div className="text-center mb-5 ">
                        <h1 className="text-2xl capitalize font-bold">{author.name}</h1>
                        <p className="capitalize">{userDetails?.membership} member</p>

                    </div>
                    <figure className="px-10">
                        <img src={author.avatar} alt="Shoes" className="rounded-xl max-h-60 w-full object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <div className="w-full max-w-md mx-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b"><span className="font-bold ">Joined</span> : {userDetails?.userJoined?.split(' ').slice(1, 4).join(' ')}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b"><span className="font-bold ">Post</span> : 5</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b"><span className="font-bold ">Ratings</span> : 4.5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="w-2/3">

                    {/* post  */}
                    <div key={_id} className="card  bg-base-100 rounded-none border p-10 mb-5">
                        <div className="flex gap-5">
                            <div className="">
                                <h2 className="card-title mb-2">{title}</h2>
                                <p className="text-[#BDC3C7]">{description}</p>
                            </div>
                        </div>
                        <div className="divider"></div>


                        <div className="flex items-center justify-around">
                            <div className="flex items-center gap-10">
                                <div className="flex gap-2 items-center">
                                    <button onClick={handleUpVote}><img className="w-5" src={like} alt="" /></button>
                                    <p className="text-green-500">{upvotes}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={handleDownVote}
                                    ><img className="w-6" src={dislike} alt="" /></button>
                                    <p className="text-red-500">{votesCount.downvotes}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FcClock className="text-2xl"></FcClock>
                                    <p className="text-[#BDC3C7]">{time}</p>
                                </div>

                            </div>



                            <div className="flex gap-2">

                                <div className="flex gap-2 items-center mr-5">
                                    <p className="text-[#BDC3C7]">{tag}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button><img className="w-5" src={comment} alt="" /></button>
                                    <p className="text-red-500">{allComments.length}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FacebookShareButton url={shareUrl}>
                                        <img className="w-5" src={share} alt="Share on Facebook" />
                                    </FacebookShareButton>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* comment*/}
            <div className="p-8 rounded-md shadow-md">
                <h2 className="text-white text-2xl font-semibold mb-4">Comments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-white">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="py-2 px-4">Commenter email</th>
                                <th className="py-2 px-4">Comment</th>
                                <th className="py-2 px-4">Feedback</th>
                                <th className="py-2 px-4">Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allComments.map((comment) => (
                                <tr key={comment._id} className="text-center">
                                    <td className="py-2 px-4">{comment?.commenterEmail}</td>
                                    <td className="py-2 px-4">
                                        <span className="">{comment.userComment}</span>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <select
                                            onChange={(e) =>
                                                handleFeedbackSelect(comment._id, e.target.value, comment.userComment)
                                            }
                                            className="select select-primary"
                                        >
                                            <option disabled selected>Select Feedback</option>
                                            <option value="spam">Spam</option>
                                            <option value="harassment">Harassment</option>
                                            <option value="violence">Violence</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleReport(comment._id)}
                                            className="text-2xl btn"
                                            disabled={feedbacks.action === 'none' || feedbacks.commentId !== comment._id || reportClicked}
                                        >
                                            <FcHighPriority />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPostDetails;