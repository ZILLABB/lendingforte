"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

interface ReviewSubmitStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function ReviewSubmitStep({ formData, handleChange, formErrors }: ReviewSubmitStepProps) {
  // Function to mask sensitive information
  const maskSensitiveInfo = (text: string, type: string) => {
    if (!text) return '';
    
    switch (type) {
      case 'ssn':
        // Show only last 4 digits of SSN
        return `XXX-XX-${text.slice(-4)}`;
      case 'phone':
        // Show only last 4 digits of phone number
        if (text.length >= 4) {
          return `(XXX) XXX-${text.slice(-4)}`;
        }
        return text;
      default:
        return text;
    }
  };

  // Sections for review
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Name", value: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}` },
        { label: "Date of Birth", value: formData.dob },
        { label: "Social Security Number", value: maskSensitiveInfo(formData.ssn, 'ssn') },
        { label: "Gender", value: formData.gender },
        { label: "Marital Status", value: formData.maritalStatus },
        { label: "Email", value: formData.email },
        { label: "Phone Number", value: formData.phoneNumber },
      ]
    },
    {
      title: "Address & Identity",
      fields: [
        { label: "Street Address", value: formData.streetAddress },
        { label: "Apartment/Unit", value: formData.apartmentUnit || 'N/A' },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "ZIP Code", value: formData.zipCode },
        { label: "Years at Address", value: formData.yearsAtAddress },
        { label: "Housing Status", value: formData.housingStatus },
        { label: "Monthly Housing Cost", value: formData.monthlyHousingCost ? `$${formData.monthlyHousingCost}` : 'N/A' },
      ]
    },
    {
      title: "Employment & Income",
      fields: [
        { label: "Employment Status", value: formData.employmentStatus },
        { label: "Employer Name", value: formData.employerName || 'N/A' },
        { label: "Job Title", value: formData.jobTitle || 'N/A' },
        { label: "Length of Employment", value: formData.employmentLength || 'N/A' },
        { label: "Annual Income", value: formData.annualIncome ? `$${formData.annualIncome}` : 'N/A' },
        { label: "Pay Frequency", value: formData.payFrequency },
        { label: "Other Income Source", value: formData.otherIncomeSource || 'N/A' },
        { label: "Other Income Amount", value: formData.otherIncomeAmount ? `$${formData.otherIncomeAmount}` : 'N/A' },
      ]
    },
    {
      title: "Loan Details",
      fields: [
        { label: "Loan Type", value: formData.loanType },
        { label: "Loan Purpose", value: formData.loanPurpose },
        { label: "Loan Amount", value: formData.loanAmount ? `$${formData.loanAmount}` : 'N/A' },
        { label: "Loan Term", value: formData.loanTerm ? `${formData.loanTerm} months` : 'N/A' },
      ]
    },
    {
      title: "Financial Information",
      fields: [
        { label: "Bank Name", value: formData.bankName },
        { label: "Account Type", value: formData.accountType },
        { label: "Monthly Debt Payments", value: formData.monthlyDebtPayments ? `$${formData.monthlyDebtPayments}` : 'N/A' },
        { label: "Existing Loans", value: formData.existingLoans === true ? 'Yes' : 'No' },
      ]
    },
    {
      title: "Agreements",
      fields: [
        { label: "Credit Check Consent", value: formData.creditCheckConsent ? 'Agreed' : 'Not Agreed' },
        { label: "Terms Agreement", value: formData.termsAgreement ? 'Agreed' : 'Not Agreed' },
        { label: "Privacy Policy Agreement", value: formData.privacyPolicyAgreement ? 'Agreed' : 'Not Agreed' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <CheckCircleIcon className="w-6 h-6 mr-2 text-green-400" /> Review & Submit
      </h2>
      
      <div className="space-y-8">
        <p className="text-gray-300">
          Please review your application information carefully before submitting. You can go back to any section to make changes.
        </p>
        
        {/* Application ID */}
        <div className="p-4 bg-green-900/30 rounded-lg border border-green-800">
          <p className="text-sm text-gray-300">Application ID</p>
          <p className="text-xl font-mono font-semibold text-green-400">{formData.applicationId}</p>
        </div>
        
        {/* Review Sections */}
        {sections.map((section, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-700/50 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-200">{section.title}</h3>
              <Link href={`#step-${index + 1}`} className="text-green-400 hover:text-green-300 flex items-center text-sm">
                <PencilSquareIcon className="w-4 h-4 mr-1" /> Edit
              </Link>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex flex-col">
                    <dt className="text-sm text-gray-400">{field.label}</dt>
                    <dd className="text-gray-200 font-medium">{field.value || 'Not provided'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
        
        {/* Final Confirmation */}
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
          <div className="flex items-start mb-4">
            <div className="flex items-center h-5">
              <input
                id="finalConfirmation"
                name="finalConfirmation"
                type="checkbox"
                checked={formData.finalConfirmation}
                onChange={(e) => {
                  const syntheticEvent = {
                    target: {
                      name: 'finalConfirmation',
                      checked: e.target.checked,
                      type: 'checkbox'
                    }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  handleChange(syntheticEvent);
                }}
                className="h-5 w-5 rounded text-green-500 focus:ring-green-500 focus:ring-offset-gray-800 bg-gray-700 border-gray-600"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="finalConfirmation" className="text-gray-300 font-medium">
                I confirm that all information provided is accurate and complete. <span className="text-red-500">*</span>
              </label>
              {formErrors.finalConfirmation && <p className="text-xs text-red-400 mt-1">{formErrors.finalConfirmation}</p>}
            </div>
          </div>
          
          <p className="text-sm text-gray-300">
            By submitting this application, you authorize Lending Forte to obtain credit reports and verify the information 
            provided. This application does not guarantee loan approval. Final loan terms will be determined based on your 
            credit profile and other factors.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
