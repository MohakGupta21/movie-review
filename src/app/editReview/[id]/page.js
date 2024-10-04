"use client";

// import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import {useState,useEffect} from "react";
import { SERVER_URL } from "../../utils/constants";
import axios from "axios";
import Header from "../../components/header";

export default function EditReview({ params }) {
  const [rating,setRating] = useState(0);
  const [comments,setComments] = useState("");

  const router = useRouter();
  useEffect(() => {
    const fetchReview = async () => {
      const res = await fetch(`${SERVER_URL}/getReview/${params.id}`);
      if (!res.ok) {
        console.error("Failed to fetch review");
        return;
      }
      const data = await res.json();
      // console.log(data);
      setRating(data.rating);
      setComments(data.comments);
    };

    fetchReview();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = {
        rating:rating,
        comments:comments
      }
      console.log(data);
      const res = await axios.put(`${SERVER_URL}/editReview/${params.id}`,data);
      if(res.status ===200){
        console.log('Review updated successfully: ',res.data);
        alert('Review updated successfully');
        router.push('/');
      }else{
        console.log('Unexpected response: ',res.status);
        alert('Failed to update review');
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error);
    }
  }
  return (
    <div>
      <Header />
      {/* <div>Post: {params.id}</div> */}
      <div className="m-auto mt-20 p-5 border-2 border-gray-400 max-w-[400px] h-fit">
        <h2 className="text-3xl mb-3">Edit review</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full px-2 py-5">
            <div className="mb-3">
              <input
                type="text"
                value={comments}
                onChange={(e)=>setComments(e.target.value)}
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Comment"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Rating"
              />
            </div>
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 text-white p-2 text-sm hover:bg-indigo-400"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
