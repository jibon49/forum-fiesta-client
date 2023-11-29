import dateFormat from "dateformat";
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../AuthProviders/AuthProviders';
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const AdPost = () => {

    const { user } = useContext(AuthContext)
    const postId = uuidv4();
    const [myPostCount, setMyPostCount] = useState(0)
    const [membershipStatus, setMembershipStatus] = useState('')
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()




    const url = `/my-posts/count?email=${user.email}`

    useEffect(() => {
        axiosSecure.get(url)
            .then(res => setMyPostCount(res.data.postCount))
    }, [axiosSecure, url])

    console.log(myPostCount)


    useEffect(() => {
        axiosSecure.get(`/users/membership/${user.email}`)
            .then(res => setMembershipStatus(res.data.membership))
    }, [axiosSecure, user.email])



    const handleAddAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const tag = form.tag.value;
        const description = form.description.value;
        const time = dateFormat(new Date());

        const author = {
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email
        }
        let commentsCount = 0;

        const votesCount = {
            upvotes: 0,
            downvotes: 0,
        }

        const createPost = { postId, title, tag, description, time, author, votesCount, commentsCount }


        console.log(createPost);

        if (membershipStatus === 'gold') {
            axiosPublic.post('/ad-post', createPost)
                .then(data => {
                    console.log(data.data);
                    if (data.data.insertedId) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Assignment created Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    }
                })
        }

        else {
            if (myPostCount < 5) {
                axiosPublic.post('/ad-post', createPost)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.insertedId) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Assignment created Successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                        }
                    })
            }

            else{
                Swal.fire({
                    title: "Post limit exceeded",
                    text: "Become a gold member to post more than 5",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Pricing"
                  }).then((result) => {
                    if(result.isConfirmed){
                        console.log(result)
                    navigate('/membership')
                    }
                  });
            }
        }

    }

    return (
        <div className=" w-full mx-auto mt-20">

            <form onSubmit={handleAddAssignment}>

                {/* title and image */}
                <div className="flex md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Post Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Tag</span>
                        </label>
                        <select name="tag"
                            className="select select-bordered w-full bg-[#F3F3F3]">
                            <option value="technology">Technology</option>
                            <option value="science">Science</option>
                            <option value="art">Art</option>
                            <option value="books">Books</option>
                            <option value="movies">Movies</option>
                            <option value="music">Music</option>
                            <option value="health">Health</option>
                            <option value="travel">Travel</option>
                            <option value="food">Food</option>
                            <option value="gaming">Gaming</option>

                        </select>
                    </div>
                </div>



                {/* description */}
                <div className="">

                    <div className="form-control">
                        <label className="label">
                            <span className="text-xl font-semibold"> Description</span>
                        </label>
                        <textarea

                            name="description"
                            placeholder="description"
                            className="textarea textarea-bordered w-full bg-[#F3F3F3] h-40"

                            required />
                    </div>
                </div>

                {/* submit */}
                <div className=" w-full mx-auto mt-6">
                    <button className=" btn btn-outline w-full mb-2">
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AdPost;