"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { push, ref } from "firebase/database";
import { database } from "../../config"; // Assuming you have firebase configuration
import Link from "next/link";

// Function to generate a random 9-digit application number
const generateApplicationNumber = () => {
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
  return randomNumber.toString().substring(0, 9);
};

export default function LoanApplicationPage() {
  // Generated application number
  const generatedNumber = generateApplicationNumber();
  
  // Step for multi-step form navigation
  const [step, setStep] = useState(1);

  // Form data state
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle next step in the form
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Handle previous step in the form
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Handle input changes in the form
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to send email via EmailJS
  const handleEmailJs = () => {
    emailjs
      .send(
        "service_mmu6bro",
        "template_e9tvy3f",
        formData,
        "mRm23xSD-WMIu8ZDK"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Your loan application has been submitted successfully!", {
          theme: "colored",
        });
        setIsModalOpen(true);
      })
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      );
  };

  // Function to save data to Firebase
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

  // Submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate if the agreement checkbox is checked
    if (!formData.agreement) {
      toast.error("You must agree to the terms and conditions.", {
        theme: "colored",
      });
      return;
    }

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
        <p className="mb-6 text-center">
          Please complete the application and include all required information,
          documentation, and identification.
        </p>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="bg-gray-700 shadow-md rounded-[8px] px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="middleName">
                  Middle Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="middleName"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Broughton"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                <label className="block font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  required
                />
              </div>

              <button
                onClick={handleNextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="bg-gray-700 shadow-md rounded-[8px] px-8 pt-6 pb-8 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="area">
                    Address
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  <label className="block font-bold mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="South Carolina"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  <label className="block font-bold mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  <label className="block font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="janedoe@example.com"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="bg-gray-700 shadow-md rounded-[8px] px-8 pt-6 pb-8 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="profession">
                    Profession
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="profession"
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="loanType">
                    Loan Type
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="loanType"
                    type="text"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    placeholder="Home Loan"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="monthlyIncome">
                    Monthly Income
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="monthlyIncome"
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    placeholder="5000"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="requestedAmount">
                    Requested Loan Amount
                  </label>
                  <input
                    className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="requestedAmount"
                    type="number"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    placeholder="20000"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="bg-gray-700 shadow-md rounded-[8px] px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="agreement">
                  I agree to the terms and conditions
                </label>
                <input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
              </div>

              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Submit Application
              </button>
            </div>
          )}
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Your loan application has been successfully submitted!
            </h2>
            <p>Your application number is: {generatedNumber}</p>
            <Link
              href="/"
              className="mt-6 inline-block bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
