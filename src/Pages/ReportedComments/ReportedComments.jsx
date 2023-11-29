
import { FcEmptyTrash } from "react-icons/fc";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ReportedComments = () => {
    const axiosSecure = useAxiosSecure()



    const { data: allReport = [], refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments/reported');
            return res.data;
        }
    })


    const handleDelete = (reportId, commentId) => {
        console.log('handle delete clicked', reportId, commentId)



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
                axiosSecure.delete(`/comments/${reportId}`)
                    .then(res => {
                        console.log(res.data)
                    })
                axiosSecure.delete(`/comments/reported/${commentId}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                }
                refetch()
        });



    }


    return (
        <div>
            <h1>Reported comments</h1>
            <div>
                <div className="p-8 rounded-md shadow-md">
                    <h2 className="text-white text-2xl font-semibold mb-4">Comments</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-white">
                            <thead>
                                <tr className="bg-indigo-500 text-white">
                                    <th className="py-2 px-4">Reported by</th>
                                    <th className="py-2 px-4">Comment</th>
                                    <th className="py-2 px-4">Feedback</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allReport.map((report) => (
                                    <tr key={report._id} className="text-center">
                                        <td className="py-2 px-4">{report?.reportedBy?.name}</td>
                                        <td className="py-2 px-4">
                                            <span className="">{report.comment}</span>
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            {report.subject}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleDelete(report.commentId, report._id)}

                                            >
                                                <FcEmptyTrash />
                                            </button>
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

export default ReportedComments;