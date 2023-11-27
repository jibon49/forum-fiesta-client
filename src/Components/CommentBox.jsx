import { useContext} from 'react';
import { AuthContext } from '../AuthProviders/AuthProviders';
import useAxiosPublic from '../Hooks/AxiosPublic/useAxiosPublic';
import dateFormat, { masks } from "dateformat";

const CommentBox = ({ postId }) => {
    

    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);


    const handleCommentSubmit = (e)=>{

        e.preventDefault()
        const postInfo = postId
        const userComment = e.target.comment.value
        const commenterName = user.displayName;
        const commenterPhoto = user.photoURL;
        let reported = false;
        const commentTime = dateFormat(new Date());

        const userCommentInfo = {userComment, postInfo, commenterName, reported, commentTime, commenterPhoto }
        console.log(userCommentInfo)

        axiosPublic.post("/comments", userCommentInfo)
        .then(res=>console.log(res.data))

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
