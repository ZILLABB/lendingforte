"use client";

import { useState } from "react";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface PersonalInfoStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function PersonalInfoStep({ formData, handleChange, formErrors }: PersonalInfoStepProps) {
  // State for masked SSN display
  const [ssnMasked, setSsnMasked] = useState(true);
  
  // Handle SSN input with formatting
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format as XXX-XX-XXXX
    let formattedValue = '';
    if (digitsOnly.length > 0) {
      formattedValue = digitsOnly.slice(0, 3);
      if (digitsOnly.length > 3) {
        formattedValue += '-' + digitsOnly.slice(3, 5);
      }
      if (digitsOnly.length > 5) {
        formattedValue += '-' + digitsOnly.slice(5, 9);
      }
    }
    
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: 'ssn',
        value: formattedValue,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };
  
  // Handle phone number input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    let formattedValue = '';
    if (digitsOnly.length > 0) {
      formattedValue = '(' + digitsOnly.slice(0, 3);
      if (digitsOnly.length > 3) {
        formattedValue += ') ' + digitsOnly.slice(3, 6);
      }
      if (digitsOnly.length > 6) {
        formattedValue += '-' + digitsOnly.slice(6, 10);
      }
    }
    
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: 'phoneNumber',
        value: formattedValue,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };
  
  // Toggle SSN visibility
  const toggleSSNVisibility = () => {
    setSsnMasked(!ssnMasked);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <UserIcon className="w-6 h-6 mr-2 text-green-400" /> Personal Information
      </h2>
      
      <div className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-300">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.firstName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
            {formErrors.firstName && <p className="text-xs text-red-400 mt-1">{formErrors.firstName}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="middleName" className="text-sm font-medium text-gray-300">
              Middle Name <span className="text-gray-500">(optional)</span>
            </label>
            <input
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
              id="middleName"
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="A"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-300">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.lastName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
            {formErrors.lastName && <p className="text-xs text-red-400 mt-1">{formErrors.lastName}</p>}
          </div>
        </div>
        
        {/* Date of Birth and SSN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="dob" className="text-sm font-medium text-gray-300">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.dob ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
            {formErrors.dob && <p className="text-xs text-red-400 mt-1">{formErrors.dob}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="ssn" className="text-sm font-medium text-gray-300">
              Social Security Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.ssn ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="ssn"
                type={ssnMasked ? "password" : "text"}
                name="ssn"
                value={formData.ssn}
                onChange={handleSSNChange}
                placeholder="XXX-XX-XXXX"
                maxLength={11}
                aria-describedby="ssn-format"
                required
              />
              <button
                type="button"
                onClick={toggleSSNVisibility}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                aria-label={ssnMasked ? "Show SSN" : "Hide SSN"}
              >
                <ShieldCheckIcon className="h-5 w-5" />
              </button>
            </div>
            <p id="ssn-format" className="text-xs text-gray-500 mt-1">Format: XXX-XX-XXXX</p>
            {formErrors.ssn && <p className="text-xs text-red-400 mt-1">{formErrors.ssn}</p>}
          </div>
        </div>
        
        {/* Gender and Marital Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="gender" className="text-sm font-medium text-gray-300">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.gender ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {formErrors.gender && <p className="text-xs text-red-400 mt-1">{formErrors.gender}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="maritalStatus" className="text-sm font-medium text-gray-300">
              Marital Status <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.maritalStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="separated">Separated</option>
            </select>
            {formErrors.maritalStatus && <p className="text-xs text-red-400 mt-1">{formErrors.maritalStatus}</p>}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.email ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
            />
            {formErrors.email && <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.phoneNumber ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(555) 123-4567"
              required
            />
            {formErrors.phoneNumber && <p className="text-xs text-red-400 mt-1">{formErrors.phoneNumber}</p>}
          </div>
        </div>
      </div>
      
      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Privacy Notice:</span> Your personal information is protected by our 
          <a href="/privacy-policy" className="text-green-400 hover:text-green-300 ml-1">Privacy Policy</a>. 
          We use industry-standard encryption to protect your sensitive information.
        </p>
      </div>
    </motion.div>
  );
}
