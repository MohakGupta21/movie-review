"use client"

import { useEffect, useState } from "react";
import Header from "../components/header";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function addReview() {
  const [movies, setMovies] = useState([]);
  const [select,setSelect] = useState("");
  const [reviewer,setReviewer] = useState("");
  const [rating,setRating] = useState(0);
  const [comments,setComments] = useState("");

  const router = useRouter();
  // Fetch movies when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`${SERVER_URL}/movies`);
      if (!res.ok) {
        console.error("Failed to fetch movies");
        return;
      }
      const data = await res.json();
      setMovies(data);
      setSelect(data[0].name);
    };

    fetchMovies();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = {
        movie:select,
        rating:rating,
        reviewer:reviewer,
        comments:comments
      }
      console.log(data);
      const res = await axios.post(`${SERVER_URL}/addReview`,data);
      if(res.status ===201){
        console.log('Review added successfully: ',res.data);
        alert('Review added successfully');
        router.push('/');
      }else{
        console.log('Unexpected response: ',res.status);
        alert('Failed to add review');
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error);
    }
  }

  return (
    <div>
      <Header />
      <div className="m-auto mt-20 p-5 border-2 border-gray-400 max-w-[400px] h-fit">
        <h2 className="text-3xl mb-3">Add new review</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full px-2 py-5">
            <div className="mb-3">
              <select
                id="movie"
                name="movie"
                value={select}
                onChange={(e)=>setSelect(e.target.value)}
                autoComplete="country-name"
                className="pl-2 py-1 leading-6 rounded-sm border-2 border-gray-300 block bg-white w-full"
              >
                {
                  movies.map((value,ind)=>(
                    <option key={ind} defaultValue={value.name}>{value.name}</option>
                  ))
                }
                

              </select>
            </div>
            <div className="mb-3">
              <input
                value={reviewer}
                onChange={(e)=>setReviewer(e.target.value)}
                className="pl-2 leading-6 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                max="10"
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
                                  
                className="pl-2 leading-6 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Rating out of 10"
              />
            </div>
            <div className="mb-3">
              <textarea
                rows="3"
                value={comments}
                onChange={(e)=>setComments(e.target.value)}
                  
                className="pl-2 leading-6 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Review comments"
              />
            </div>
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 text-white p-2 text-sm hover:bg-indigo-400"
              >
                Add review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
