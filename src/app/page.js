"use client";
import Link from "next/link";
import DeleteIcon from "./components/delete";
import Header from "./components/header";
import Edit from "./components/edit";
import { useEffect, useState } from "react";
import { SERVER_URL } from "./utils/constants"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const router = useRouter();
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
    };

    fetchMovies();
  }, []);

  // Handle search input change
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  const deleteMovie = async(id)=>{
      try {
        const res = await axios.delete(`${SERVER_URL}/deleteMovie/${id}`);

        if(res.status===200){
          console.log("Deleted Successfully");
          alert("Movie with id-"+id+" deleted");
          window.location.reload();
        }else{
          console.log("Failed to delete");
          alert("Failed to delete");
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error);
      }
  }
  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Header />
      <div className="p-4">
        <h2 className="text-3xl font-bond">The best movie reviews site!</h2>
        <div className="relative my-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zm7-2l5 5"
              />
            </svg>
          </span>
          <input
            onChange={(e) => handleSearchChange(e)}
            type="text"
            className="w-100 pl-9 pr-4 py-2 block w-4/5 border-2 border-indigo-400 rounded-sm focus:outline-none focus:ring-indigo-500"
            placeholder="Search for your favourite movie"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-2 p-3 pl-0">
        {filteredMovies.length > 0 &&
          filteredMovies.map((value, ind) => (
            <div
              key={ind}
              className="relative min-w-[300px] flex-1 bg-indigo-200 p-4 ml-3 mb-3"
            >
              <Link
                href={`/reviews/movie/${value.id}`}
                className="mb-2 font-semibold"
              >
                {value.name}
              </Link>
              <p className="mb-2 italic text-sm">
                Released: {value.release_date}
              </p>
              <p className="mb-2 font-bold text-sm">
                Rating: {value.avg_rating}
              </p>

              <div className="absolute flex bottom-2 right-2">
                <Link
                  href={`/editMovie/${value.id}`}
                  className="mr-2"
                >
                  <Edit currentColor="gray" />
                </Link>
                <span onClick={()=>deleteMovie(value.id)}>
                  <DeleteIcon currentColor="gray" />
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
