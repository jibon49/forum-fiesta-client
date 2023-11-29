import dateFormat, { masks } from "dateformat";
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import axios from 'axios';import { AuthContext } from "../../AuthProviders/AuthProviders";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";


const MakeAnnouncement = () => {

    const { user } = useContext(AuthContext)
    const postId = uuidv4();
    const axiosPublic = useAxiosPublic()

    const handleAddAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const description = form.description.value;
        const authorName = user.displayName;
        const authorImage = user.photoURL;


        const createAnnouncement = {title, description, authorImage, authorName}



        console.log(createAnnouncement);


        axiosPublic.post('/ad-announcement', createAnnouncement)
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

                {/* title */}
                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xl font-semibold">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
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

export default MakeAnnouncement;