import { useContext } from "react";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { FcComments, FcEmptyTrash } from "react-icons/fc";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const MyPost = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    let email = "mymail";

    if (!loading) {
        email = user.email
    }



    const url = `/my-posts?email=${email}`

    const { data: myPosts = [], refetch, error, isLoading } = useQuery(
        {
            queryKey: ['myPosts', email],
            queryFn: async () => {
                const response = await axiosPublic.get(url, { credentials: 'include' });
                return response.data;
            }
        }
    );

    const handleDelete = (id) => {

        console.log('clicked handleView', id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/posts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });


    }

    return (
        <div>
            {
                loading ? <span className="loading loading-spinner text-center mx-auto flex loading-lg"></span>
                    :
                    <div>
                        <h1>My Post{myPosts.length}</h1>
                        <div className="p-8 rounded-md shadow-md">
                            <h2 className="text-white text-2xl font-semibold mb-4">My Assignments</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-white">
                                    <thead>
                                        <tr className="bg-indigo-500 text-white">
                                            <th className="py-2 px-4">Assignment Title</th>
                                            <th className="py-2 px-4">Number of votes</th>
                                            <th className="py-2 px-4">Comments</th>
                                            <th className="py-2 px-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myPosts.map((post) => (
                                            <tr key={post.postId} className="text-center">

                                                <td className="py-2 px-4">{post.title}</td>

                                                <td className="py-2 px-4">
                                                    <span className="text-blue-500">
                                                        {post.votesCount.upvotes}
                                                    </span>
                                                </td>

                                                <td className="py-2 px-4 text-center flex justify-center text-xl">
                                                    <Link to={`/post-details/${post._id}`} className='hover:bg-blue-500 px-3 py-1 rounded-xl'><FcComments></FcComments></Link>
                                                </td>

                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        className="bg-white text-xl  px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none"
                                                    >  <FcEmptyTrash></FcEmptyTrash>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyPost;