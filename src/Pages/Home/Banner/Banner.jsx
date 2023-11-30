import { useEffect, useState } from "react";
import banner from "/banner.jpg"
import useAxiosPublic from './../../../Hooks/AxiosPublic/useAxiosPublic';

const Banner = () => {

    const axiosPublic = useAxiosPublic();
    const [tags, setTags] = useState([])

    useEffect(()=>{
        axiosPublic.get('/tags')
        .then(res=>{
            setTags(res.data)
        })
    },[axiosPublic])

    return (
        <div className="hero min-h-[80vh]" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-3xl text-white">
                    <h1 className="mb-5 text-5xl font-bold"> Dive into the Forum Fiesta</h1>
                    <div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm"></span>
                            </div>
                            <input
                                type="text"
                                name="tag"
                                id="tag"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Search topics..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor="tag" className="sr-only">
                                    Tags
                                </label>
                                <select
                                    id="tag"
                                    name="tag"
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                >
                                    {
                                        tags.map(tag=><option className="capitalize" key={tag._id}>{tag.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <p className="font-semibold">Popular: <button className="bg-[#03045e] rounded-full px-2 text-sm mt-3">Science</button> </p>

                </div>
            </div>
        </div>
    );
};

export default Banner;