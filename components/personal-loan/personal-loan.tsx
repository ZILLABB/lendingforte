import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";

export default function PersonalLoanPage(): JSX.Element {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/lendingforte/vecteezy_real-estate-agent-giving-money-to-home-buyer_1227232.jpg"
        alt="Background Image"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
      />

      <div className="absolute top-0 right-0 w-full mt-4 transform text-center text-white z-10">
        <div className=" mx-auto p-3 mt-24 py-10  bg-black bg-opacity-70 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            A personal loan for your personal needs
          </h1>
          <div className="flex justify-center items-center font-medium text-lg">

          <ul >
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 text-green-500" />
              Check your rate in 5 minutes.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 text-green-500" />
              Get funded in as fast as 1 business day.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="mr-2 text-green-500" />
              36% lower rates as compared to a traditional model.
            </li>
          </ul>
          </div>
          <Link href="/loan-application">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 mb-4">
              Check Your Rate
            </button>
          </Link>
          <div className="text-center flex gap-2 items-center justify-center  font-medium text-lg">
            <FaLock className="text-green-500" />
            <p>This action won’t affect your credit score</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
