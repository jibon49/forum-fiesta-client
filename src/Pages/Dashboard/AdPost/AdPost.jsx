import dateFormat, { masks } from "dateformat";
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import axios from 'axios';
import { AuthContext } from '../../../AuthProviders/AuthProviders';
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";


const AdPost = () => {

    const { user } = useContext(AuthContext)
    const postId = uuidv4();
    const axiosPublic = useAxiosPublic()

    const handleAddAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const tag = form.tag.value;
        const description = form.description.value;
        const time = dateFormat(new Date());

        const author ={
            name : user.displayName,
            avatar : user.photoURL,
            email : user.email
        }
        let commentsCount = 0;

        const votesCount = {
            upvotes : 0,
            downvotes : 0,
        }



        const createPost = { postId, title, tag,  description, time, author,votesCount, commentsCount }




        console.log(createPost);


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