import { useQuery } from "@tanstack/react-query";


const useVoteCommentInfo = () => {

    const axiosPublic = axiosPublic();

   const {data : votesInfo=[]} = useQuery({
    queryKey : ['votesCommentInfo'],
    queryFn : async ()=>{
        const res = await axiosPublic.get(`/posts/:id`)
        return res.data;
    }
   })
   return [votesInfo]
};

export default useVoteCommentInfo;