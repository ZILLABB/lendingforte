import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";

export default function MortgagePage(): JSX.Element {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/lendingforte/vecteezy_real-estate-agent-giving-money-to-home-buyer_1227232.jpg"
        alt="Background Image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-1/2 left-1/2 mt-8 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <div className="max-w-xl mx-auto p-3 sm:w-[80%] bg-black bg-opacity-70 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            Turn your house into a dream home today
          </h1>
          <ul className="text-left font-medium text-lg">
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 w-8 h-8 text-green-500" />
              Check your rate in 5 minutes.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 w-8 h-8 text-green-500" />
              Get funded in as fast as 1 business day.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 w-8 h-8 text-green-500" />
              Apply for a loan from $1,000 to $301,000
            </li>
          </ul>
          <Link href="/loan-application">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 mb-4">
              Check Your Rate
            </button>
          </Link>
          <div className="text-left flex gap-2 items-center  font-medium text-lg">
            <FaLock className="text-green-500 w-8 h-8" />
            <p>This action won’t affect your credit score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
