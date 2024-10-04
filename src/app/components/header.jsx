"use client";
import Link from "next/link";

export default function Header(){
    return(
        <div className="p-4 bg-gray-100 flex items-baseline justify-between">
        <Link href="/" className="text-lg uppercase leading-7 text-gray-900">
          MovieCritic
        </Link>
        <div className="flex">
          <span>
            <Link
              href="/addMovie"
              className="inline-flex rounded-sm items-center text-indigo-500 bg-white outline outline-indigo-400 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Add New Movie
            </Link>
          </span>

          <span className="ml-3">
            <Link
              href="/addReview"
              className="inline-flex rounded-sm items-center text-white bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-400"
            >
              Add New Review
            </Link>
          </span>
        </div>
      </div>
    )
}