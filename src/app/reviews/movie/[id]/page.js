"use client";

import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../utils/constants"; // Adjust the path as necessary
import Header from "../../../components/header";
import Review from "../../../components/review";

export default function ReviewsOfMovie({ params }) {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${SERVER_URL}/getMovie/${params.id}`);
      if (!res.ok) {
        console.error("Failed to fetch movie");
        return;
      }
      const data = await res.json();
      setMovie(data);
      setReviews(data?.reviews);
    };

    fetchMovie();
  }, []);
  return (
    <div>
      <Header />
      <div className="flex justify-between px-3 my-3">
        <h2 className="text-3xl">{movie?.name}</h2>
        <h2 className="text-3xl text-indigo-400">{movie?.avg_rating}/10</h2>
      </div>

      <div className="py-5">
        {reviews.map((value, ind) => (
          <div className="m-3" key={ind}>
            <Review
              id={value?.id}
              rating={value?.rating}
              reviewer={value?.reviewer}
              comment={value?.comments}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
