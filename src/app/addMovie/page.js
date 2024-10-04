"use client"

import axios from "axios";
import Header from "../components/header";
import { SERVER_URL } from "../utils/constants";
import {useState} from "react";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const [name,setName] = useState("");
  const [release_date,setReleaseDate] = useState(""); 
  const router = useRouter();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVER_URL}/addMovie`,{
        name,
        release_date
      });
      if(res.status ===201){
        console.log('Movie added successfully: ',res.data);
        alert('Movie added successfully');
        router.push('/');
      }else{
        console.log('Unexpected response: ',res.status);
        alert('Failed to add movie');
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error);
    }
  }
  return (
    <div>
      <Header/>
      <div className="m-auto mt-20 p-5 border-2 border-gray-400 max-w-[400px] h-fit">
        <h2 className="text-3xl mb-3">Add new movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full px-2 py-5">
            <div className="mb-3">
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                id="release_date"
                name="release_date"
                value={release_date}
                onChange={(e)=>setReleaseDate(e.target.value)}
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Release Date"
                required
              />
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="bg-indigo-500 text-white p-2 text-sm hover:bg-indigo-400"
              >
                Create Movie
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
