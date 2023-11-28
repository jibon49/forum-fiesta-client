import { useContext } from 'react';
import { AuthContext } from '../AuthProviders/AuthProviders';
import useAxiosPublic from '../Hooks/AxiosPublic/useAxiosPublic';
import dateFormat, { masks } from "dateformat";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CommentBox = ({ postId, refetch }) => {


    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const handleCommentSubmit = (e) => {

        e.preventDefault()

        if (user && user.email) {
            const postInfo = postId
            const userComment = e.target.comment.value
            const commenterName = user.displayName;
            const commenterPhoto = user.photoURL;
            let reported = false;
            const commentTime = dateFormat(new Date());

            const userCommentInfo = { userComment, postInfo, commenterName, reported, commentTime, commenterPhoto }
            console.log(userCommentInfo)

            axiosPublic.post("/comments", userCommentInfo)
                .then(res => {
                    console.log(res.data)

                    refetch()
                })
            e.target.reset()
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Log in to continue",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }






    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleCommentSubmit}>
                <div className='form-control'>
                    <textarea
                        className="w-full h-60 p-2  border-2 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Write your comment..."
                        name='comment'
                    ></textarea>
                    <div className="form-control mt-2 flex justify-end">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CommentBox;
