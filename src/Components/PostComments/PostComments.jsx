import { FcClock, FcHighPriority } from "react-icons/fc";

const PostComments = ({comment}) => {

    const {commenterName, commenterPhoto, userComment,commentTime} = comment

    return (
        <div className="card  bg-base-100 border-y-4 rounded-none p-10 mb-5 ">
            <div className="flex gap-5">
                <div className="text-center">
                    <div className="avatar">
                        <div className="w-14 h-14 rounded-full">
                            <img src={commenterPhoto} />
                        </div>
                    </div>
                    <div>
                        <p>{commenterName}</p>
                    </div>
                </div>
                <div className="">
                    <p className="font-bold">{userComment}</p>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <div className="flex gap-2 items-center">
                        <FcClock className="text-2xl"></FcClock>
                        <p className="text-[#BDC3C7]">{commentTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostComments;