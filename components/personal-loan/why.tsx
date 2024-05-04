import React from "react";
import {
  FaCalculator,
  FaCalendar,
  FaCalendarDay,
  FaDollarSign,
} from "react-icons/fa";

const WhyChooseLendingFortePage: React.FC = () => {
  return (
    <div className="bg-white p-20 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">
        Why choose <span className="text-green-600">Lending Forte</span> for
        your online personal loan?
      </h1>
      <div className="">
        <p className="mb-2 text-base">
          You're more than your credit score — Our model looks at factors such
          as your education and employment to help you get a rate you deserve.
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
              You can get a personal loan from $1,000 to $300,000.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaDollarSign className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            Fixed Rates and Terms: <br />
            <span className="text-base">
              Choose between personal loans in 3 or 5 year terms, with fixed
              rates of 4.8% - 31.99% APR.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaCalendarDay className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            No Prepayment Fees: <br />
            <span className="text-base">
              You can prepay your loan at any time with no fee or penalty.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseLendingFortePage;
