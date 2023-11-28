import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.userName} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div>
                <h1>All users{users.length}</h1>
                <div className="p-8 rounded-md shadow-md">
                    <h2 className="text-white text-2xl font-semibold mb-4">My Assignments</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-white">
                            <thead>
                                <tr className="bg-indigo-500 text-white">
                                    <th className="py-2 px-4">Users Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Make Admin</th>
                                    <th className="py-2 px-4">Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="text-center">
                                        <td className="py-2 capitalize px-4">{user.userName}</td>
                                        <td className="py-2 px-4">
                                            <span className="text-blue-500">
                                                {user.userMail}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 text-center flex justify-center text-xl">
                                        { user.userRole === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-md bg-blue-500">
                                        <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                    </button>}
                                        </td>
                                        <td className="py-2 capitalize px-4">
                                            {user.membership}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;