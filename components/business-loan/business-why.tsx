import React from "react";
import {
  FaCalculator,
  FaCalendarDay,
  FaDollarSign,
} from "react-icons/fa";

const BusinessWhyPage: React.FC = () => {
  return (
    <div className=" p-4 text-center text-white">
      <h1 className="text-3xl font-bold text-center mb-4">
        Why choose <span className="text-green-600">Lending Forte</span> for
        your online business loan?
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

          <p className="mb-2 text-xl text-center  font-medium ">
            <h1>Flexible Loan Amounts</h1>
            <span className="text-base">
              You can get a business loan from $1,000 to $100,000,000.
            </span>
          </p>
        </div>
        <div className="flex flex-col  items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaDollarSign className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            <h1>Fixed Rates and Terms</h1>
            <span className="text-base">
              Choose between business loans in 3 or 10 year terms, with fixed
              and calculated rates of 4.8% - 31.99% APR.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center !text-center gap-2">
          <div className="bg-gray-200 mb-4 w-20 h-20 flex justify-center items-center rounded-full p-2 ">
            <FaCalendarDay className="w-10 h-10 text-green-600  " />
          </div>
          <p className="mb-2 text-xl  font-medium">
            <h1>No Prepayment Fees</h1>
            <span className="text-base">
              You can prepay your loan at any time with no fee or penalty.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessWhyPage;
