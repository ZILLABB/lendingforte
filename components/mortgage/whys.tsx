import React from "react";
import {
  FaCalculator,
  FaCalendar,
  FaCalendarDay,
  FaDollarSign,
} from "react-icons/fa";

const WhyChoosemortgage: React.FC = () => {
  return (
    <div className="bg-white p-20 text-gray-900">
      <h1 className="text-3xl text-center font-bold mb-4">
        Why choose <span className="text-green-600">Lending Forte</span> for
        your home improvement loan?
      </h1>
      <div className="">
        <p className="mb-2 text-base text-center px-36">
          Our online process makes it easy to apply for a home renovation loan.
          Fix a leaky roof, remodel your kitchen, or update your backyard—we're
          here to help make your home a dream home.
        </p>
      </div>
      <div className="lg:flex items-center mt-10 gap-5 justify-center">
        <div className="flex flex-col items-center  gap-2">
          <div className="bg-gray-200 shadow w-20 h-20 mb-4 flex justify-center items-center rounded-full p-2 ">
            <FaCalculator className="w-10 h-10 text-green-600  " />
          </div>

          <p className="mb-2 text-xl  font-medium ">
            Flexible Loan Amounts: <br />
            <span className="text-base">
              Choose an amount for a home improvement loan between $1,000 and
              $301,000.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaDollarSign className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            Term Period Options: <br />
            <span className="text-base">
              Your home, your term. Decide between a 3 or 5 year term for your
              home improvement loan.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaCalendarDay className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            No Collateral Required: <br />
            <span className="text-base">
              Get funds without putting collateral down with an unsecured home
              improvement loan.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoosemortgage;