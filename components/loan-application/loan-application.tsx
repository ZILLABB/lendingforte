'use client'

import { useState } from 'react'


export default function LoanApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you can add your logic to handle form submission, such as sending data to a backend server
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto py-12 pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Loan Application</h1>
        <p className=" mb-6 text-center">
          Please complete the application and include all required
          information, documentation, and identification.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block  font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block  font-bold mb-2"
                htmlFor="dob"
              >
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
              <label
                className="block  font-bold mb-2"
                htmlFor="area"
              >
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
              <label
                className="block  font-bold mb-2"
                htmlFor="city"
              >
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
            <div className="mb-4">
              <label
                className="block  font-bold mb-2"
                htmlFor="country"
              >
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
              <label
                className="block  font-bold mb-2"
                htmlFor="email"
              >
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
              <label
                className="block  font-bold mb-2"
                htmlFor="profession"
              >
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
              <label
                className="block  font-bold mb-2"
                htmlFor="loanType"
              >
                What Type of Loan do you need?
              </label>
              <select
                className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
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
                <option value="Monthly Income from Other Sources">
                  Monthly Income from Other Sources
                </option>
                <option value="Business">
                  Business
                </option>
                <option value="Other">
                  Others
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block  font-bold mb-2"
                htmlFor="monthlyIncome"
              >
                Monthly income from other sources (if any)
              </label>
              <input
                className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="monthlyIncome"
                type="text"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="Others"
              />
            </div>
            <div className="mb-4">
              <label
                className="block  font-bold mb-2"
                htmlFor="requestedAmount"
              >
                Requested Loan Amount
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
              <label
                className="block  font-bold mb-2"
                htmlFor="tenure"
              >
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
                Do you have any existing loan with <span className='font-semibold text-green-600'>Lending Forte</span>?
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
            <label
              className="block  font-bold mb-2"
              htmlFor="agreement"
            >
              <input
                className="mr-2 leading-tight accent-green-600"
                id="agreement"
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={() =>
                  setFormData({ ...formData, agreement: !formData.agreement })
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Application
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}