

const Announcements = ({announce}) => {

    const {authorImage, title, description, authorName} = announce

    return (
        <div>
            <div className="bg-slate-500">
                <div className="card  bg-base-100 border-y-4 rounded-none p-10 mb-5 ">
                            <div className="flex gap-5">
                                <div className="text-center">
                                    <div className="avatar">
                                        <div className="w-14 h-14 rounded-full">
                                            <img src={authorImage} />
                                        </div>
                                    </div>
                                    <div>
                                        <p>{authorName}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="text-xl font-bold">{title}</h1>
                                    <p className="">{description}</p>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    );
};

export default Announcements;