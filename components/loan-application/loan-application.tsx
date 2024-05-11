"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { push, ref } from "firebase/database";
import { database } from "../../config";
import Link from "next/link";

const generateApplicationNumber = () => {
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
  return randomNumber.toString().substring(0, 9);
};

export default function LoanApplicationPage() {
  const generatedNumber = generateApplicationNumber();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    dob: "",
    area: "",
    city: "",
    country: "",
    branch: "",
    phoneNumber: "",
    email: "",
    profession: "",
    loanType: "",
    monthlyIncome: "",
    requestedAmount: "",
    tenure: "",
    existingLoan: false,
    agreement: false,
    code: generatedNumber,
  });
  console.log(formData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [applicationNumber, setApplicationNumber] = useState("");

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailJs = () => {
    emailjs
      .send(
        "service_aug4hyu",
        "template_e9tvy3f",
        formData,
        "mRm23xSD-WMIu8ZDK"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success(
          "Your loan application has been submitted successfully!",
          {
            theme: "colored",
          }
        );
        setIsModalOpen(true);
      })
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      );
  };

  const handleFireBase = () => {
    try {
      const dbRef = ref(database, "loan-application");
      push(dbRef, formData);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.", {
        theme: "colored",
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleEmailJs();
    handleFireBase();
    setFormData({ ...formData });
  };

  return (
    <div className="container mx-auto py-12 pt-24 px-4">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Loan Application
        </h1>
        <p className=" mb-6 text-center">
          Please complete the application and include all required information,
          documentation, and identification.
        </p>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane "
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="middleName">
                  Middle Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="middleName"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="broughton"
                />
              </div>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="area">
                  Address
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="area"
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="5th Floor, 123 Main Street"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block  font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="South Carolina"
                  required
                />
              </div>
              <button
                onClick={handleNextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="janedoe@gmail.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="profession">
                    Profession
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="profession"
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Business"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="loanType">
                    What Type of Loan do you need?
                  </label>
                  <select
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline   "
                    id="loanType"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Loan Type</option>
                    <option value="Apartment Purchase Loan">
                      Apartment Purchase Loan
                    </option>
                    <option
                      className="hover:bg-green-600"
                      value="Monthly Income from Other Sources"
                    >
                      Monthly Income from Other Sources
                    </option>
                    <option value="Business">Business</option>
                    <option value="Home Mortgage Loan">
                      Home Mortgage Loan
                    </option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Debt Consolidation Loan">
                      Debt Consolidation Loan
                    </option>
                    <option value="Medical Loan">Medical Loan</option>
                    <option value="Vacation Loan">Vacation Loan</option>
                    <option value="Wedding Loan">Wedding Loan</option>
                    <option value="Renovation Loan">Renovation Loan</option>
                    <option value="Emergency Loan">Emergency Loan</option>
                    <option value="Other">Others</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block  font-bold mb-2"
                    htmlFor="monthlyIncome"
                  >
                    Specify type of loan (if others selected)
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="monthlyIncome"
                    type="text"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    placeholder="Small Business"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  font-bold mb-2"
                    htmlFor="requestedAmount"
                  >
                    Requested Loan Amount (USD)
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="requestedAmount"
                    type="number"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    placeholder="500,000"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block  font-bold mb-2" htmlFor="tenure">
                    Loan Term (Years)
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="tenure"
                    type="number"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                    placeholder="4"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  font-bold mb-2"
                    htmlFor="existingLoan"
                  >
                    Do you have any existing loan with{" "}
                    <span className="font-semibold text-green-600">
                      Lending Forte
                    </span>
                    ? ignore if you dont have any.
                  </label>
                  <div className="flex items-center">
                    <input
                      className="mr-2 accent-green-600"
                      id="existingLoan"
                      type="checkbox"
                      name="existingLoan"
                      checked={formData.existingLoan}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          existingLoan: !formData.existingLoan,
                        })
                      }
                    />
                    <label className="text-sm" htmlFor="existingLoan">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block  font-bold mb-2" htmlFor="agreement">
                  <input
                    className="mr-2 leading-tight accent-green-600"
                    id="agreement"
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        agreement: !formData.agreement,
                      })
                    }
                    required
                  />
                  <span className="text-sm">
                    I do hereby admit that all the above information that I have
                    input is true & correct. If any of the above information is
                    found to be false or incorrect, I understand & agree that my
                    loan application will be rejected. I agree to share my
                    information following the company policy as required.
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Previous
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit Application
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-95">
          <div className="modal bg-gray-800 shadow-lg p-8 rounded-lg max-w-xl">
            <button
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Thank you for choosing us for your loan application!
            </h2>
            <p className="text-lg mb-4">
              Your application has been successfully submitted. Below is your
              unique application number: <br />
              <span className="font-bold text-green-600">
                {generatedNumber}
              </span>
              .
            </p>
            <p>
              Our team will review your application and an agent will be
              assigned to get back to you shortly via email to continue the
              process. Thank you for considering{" "}
              <span className="font-bold text-green-700">Lending Forte</span>{" "}
              for your financial needs!
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-10 mt-4 rounded focus:outline-none focus:shadow-outline"
                // onClick={() => setIsModalOpen(false)}
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
