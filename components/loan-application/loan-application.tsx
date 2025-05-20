"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { push, ref } from "firebase/database";
import { database } from "../../config";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  UserIcon,
  IdentificationIcon,
  BriefcaseIcon,
  HomeIcon,
  CreditCardIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

export default function LoanApplication() {
  const [formData, setFormData] = useState({
    // Basic form data structure
    name: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS submission
    emailjs
      .send(
        "service_aug4hyu",
        "template_e9tvy3f",
        formData,
        "mRm23xSD-WMIu8ZDK"
      )
      .then(() => {
        toast.success("Your loan application has been submitted successfully!", {
          theme: "colored",
        });
        
        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          loanAmount: "",
          loanPurpose: "",
        });
      })
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      )
      .finally(() => {
        setIsSubmitting(false);
      });
    
    // Firebase submission
    try {
      const dbRef = ref(database, "loan-application");
      push(dbRef, formData);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 pt-24 px-4">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Loan Application
          </h1>
          <p className="text-gray-300 text-lg">
            Complete your application with all required information for faster processing
          </p>
        </motion.div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
            <UserIcon className="w-6 h-6 mr-2 text-green-400" /> Loan Application Form
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="loanAmount" className="text-sm font-medium text-gray-300">
                Loan Amount <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                id="loanAmount"
                type="text"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="$10,000"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="loanPurpose" className="text-sm font-medium text-gray-300">
                Loan Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all h-32 resize-none"
                id="loanPurpose"
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                placeholder="Please describe the purpose of your loan..."
                required
              ></textarea>
            </div>
            
            <div>
              <button
                className={`bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircleIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
