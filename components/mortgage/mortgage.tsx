import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";

export default function MortgagePage(): JSX.Element {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/lendingforte/vecteezy_real-estate-agent-giving-money-to-home-buyer_1227232.jpg"
        alt="Background Image"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
      />

      <div className="absolute top-0 left-0 mt-8 transform w-full  text-center text-white z-10">
        <div className=" mx-auto p-3 mt-24 py-10 bg-black bg-opacity-70 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            Turn your house into a dream home today
                  </h1>
                  <div className="flex justify-center items-center font-medium text-lg">
                      
                    <ul>
                        <li className="flex items-center mb-2">
                        <FaCheckCircle className="mr-2  text-green-500" />
                        Check your rate in 5 minutes.
                        </li>
                        <li className="flex items-center mb-2">
                        <FaCheckCircle className="mr-2  text-green-500" />
                        Get funded in as fast as 1 business day.
                        </li>
                        <li className="flex items-center mb-2">
                        <FaCheckCircle className="mr-2  text-green-500" />
                        Apply for a loan from $1,000 to $301,000
                        </li>
                    </ul>
                  </div>
          <Link href="/loan-application">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 mb-4">
              Check Your Rate
            </button>
          </Link>
          <div className="flex justify-center gap-2 items-center  font-medium text-lg">
            <FaLock className="text-green-500 " />
            <p>This action won’t affect your credit score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
