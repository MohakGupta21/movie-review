"use client";

import Link from "next/link";
import DeleteIcon from "./delete";
import Edit from "./edit";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

export default function Review({ id, rating, comment, reviewer }) {
  // const router = useRouter();
  const deleteReview = async () => {
    try {
      const res = await axios.delete(`${SERVER_URL}/deleteReview/${id}`);

      if (res.status === 200) {
        console.log("Deleted Successfully");
        alert("Review deleted");
        window.location.reload();
      } else {
        console.log("Failed to delete");
        alert("Failed to delete");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error);
    }
  };
  return (
    <div className="p-3 border-2 border-indigo-400 rounded-sm ">
      <div className="flex justify-between mb-3">
        <p className="leading-6">{comment}</p>
        <p className="leading-6 text-indigo-500">{rating}</p>
      </div>
      <div className="flex justify-between">
        <p className="leading-6 italic">
          By {reviewer === "" ? "Anonymous" : reviewer}
        </p>
        <div className="flex">
          <Link href={`/editReview/${id}`} className="mr-2">
            <Edit currentColor="gray" />
          </Link>
          <span onClick={deleteReview}>
            <DeleteIcon currentColor="gray" />
          </span>
        </div>
      </div>
    </div>
  );
}
