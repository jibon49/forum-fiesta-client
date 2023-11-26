import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";


const Tags = () => {

  const axiosPublic = useAxiosPublic()

  const [allTags, setAllTags] = useState([]);


  useEffect(() => {
    axiosPublic.get('/tags')
      .then(res => {
        setAllTags(res.data)
      })
  }, [])



  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Popular Tags</h2>
      <div className="divider"></div>
      <div>
        {allTags.map((tag) => (
          <div key={tag.name} className="flex justify-between items-center mb-2">
            <span className="text-gray-700 capitalize">{tag.name}</span>
            <span className="text-gray-500">{tag.postCount} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
