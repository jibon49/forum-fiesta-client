import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import banner from "/banner.jpg"

const Banner = () => {


    return (
        <div className="hero min-h-[80vh]" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-3xl text-white">
                    <h1 className="mb-5 text-5xl font-bold"> Dive into the Forum Fiesta</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for Topics..."
                            className="input  rounded-full w-full  text-black pr-10"
                        />
                        <button type="button" className="absolute inset-y-0 right-2 px-2 py-1">
                            <FaMagnifyingGlass className="text-black text-xl"></FaMagnifyingGlass>
                        </button>
                    </div>
                    <p className="font-semibold">Popular: <button className="bg-[#03045e] rounded-full px-2 text-sm mt-3">Science</button> </p>

                </div>
            </div>
        </div>
    );
};

export default Banner;