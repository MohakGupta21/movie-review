"use client"

import { useEffect, useState } from "react";
import { SERVER_URL } from "../../utils/constants"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import Header from "../../components/header";
// import axios from "axios";

export default function editMovie({params}) {

  const [mname,setMname] = useState("");
  const [mr_date,setMrDate] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${SERVER_URL}/getMovie/${params.id}`);
      if (!res.ok) {
        console.error("Failed to fetch movie");
        return;
      }
      const data = await res.json();
      // console.log(data);
      setMname(data.name);
      setMrDate(data.release_date)
    };

    fetchMovie();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/updateMovie/${params.id}`, {
        method: 'PUT',  // Sending a PUT request
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({name:mname,release_date:mr_date}),  // Send the movie data as JSON
      });
      if (!res.ok) {
        console.error("Failed to edit movie");
        return;
      }
      const data = await res.json();
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div>
      <Header />
      <div className="m-auto mt-20 p-5 border-2 border-gray-400 max-w-[400px] h-fit">
        <h2 className="text-3xl mb-3">Edit movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full px-2 py-5">
            <div className="mb-3">
              <input
                type="text"
                value={mname}
                onChange={(e)=>setMname(e.target.value)}
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                value={mr_date}
                onChange={(e)=>setMrDate(e.target.value)}       
                className="pl-2 rounded-sm border-2 border-gray-300 placeholder:text-gray-400 block bg-white w-full"
                placeholder="Release Date"
                required
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
