'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LoanRatesProps {
  loanType: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  minRate: number;
  maxRate: number;
}

export default function LoanRates({
  loanType,
  minAmount,
  maxAmount,
  minTerm,
  maxTerm,
  minRate,
  maxRate
}: LoanRatesProps) {
  // State for calculator
  const [loanAmount, setLoanAmount] = useState(
    loanType === 'mortgage' ? 250000 : loanType === 'business' ? 100000 : 25000
  );
  const [loanTerm, setLoanTerm] = useState(
    loanType === 'mortgage' ? 360 : loanType === 'business' ? 60 : 36
  );
  const [interestRate, setInterestRate] = useState(minRate);

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  // Sample rate table data
  const rateTableData = [
    {
      term: loanType === 'mortgage' ? '15 Years' : '3 Years',
      excellent: (minRate).toFixed(2) + '%',
      good: (minRate + 1).toFixed(2) + '%',
      fair: (minRate + 3).toFixed(2) + '%'
    },
    {
      term: loanType === 'mortgage' ? '20 Years' : '4 Years',
      excellent: (minRate + 0.25).toFixed(2) + '%',
      good: (minRate + 1.25).toFixed(2) + '%',
      fair: (minRate + 3.25).toFixed(2) + '%'
    },
    {
      term: loanType === 'mortgage' ? '30 Years' : '5 Years',
      excellent: (minRate + 0.5).toFixed(2) + '%',
      good: (minRate + 1.5).toFixed(2) + '%',
      fair: (minRate + 3.5).toFixed(2) + '%'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            {loanType === 'personal' ? 'Personal Loan Rates' : 
             loanType === 'mortgage' ? 'Mortgage Rates' : 
             'Business Loan Rates'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Competitive rates designed to fit your financial needs. Rates may vary based on creditworthiness and loan terms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Rate Calculator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-dark-200 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Payment Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Loan Amount: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={minAmount}
                  max={maxAmount}
                  step={loanType === 'mortgage' ? 5000 : 1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${minAmount.toLocaleString()}</span>
                  <span>${maxAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Loan Term: {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                </label>
                <input
                  type="range"
                  min={minTerm}
                  max={maxTerm}
                  step={loanType === 'mortgage' ? 60 : 12}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{minTerm} months</span>
                  <span>{maxTerm} months</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min={minRate}
                  max={maxRate}
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{minRate}%</span>
                  <span>{maxRate}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-dark-100/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-300 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Monthly Payment</p>
                  <p className="text-xl font-semibold text-white">${monthlyPayment.toFixed(2)}</p>
                </div>
                <div className="bg-dark-300 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Total Interest</p>
                  <p className="text-xl font-semibold text-white">${totalInterest.toFixed(2)}</p>
                </div>
                <div className="bg-dark-300 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Total Payment</p>
                  <p className="text-xl font-semibold text-white">${totalPayment.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/marketing/calculator" 
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
                >
                  Advanced Calculator
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Rate Table */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark-200 border border-dark-100/50 rounded-xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-dark-100/50">
                <h3 className="text-xl font-semibold text-white">Current {loanType === 'personal' ? 'Personal Loan' : loanType === 'mortgage' ? 'Mortgage' : 'Business Loan'} Rates</h3>
                <p className="text-sm text-gray-400 mt-1">Rates effective as of {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-300">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Term</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Excellent Credit</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Good Credit</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Fair Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100/50">
                    {rateTableData.map((row, index) => (
                      <tr key={index} className="hover:bg-dark-300/50 transition-colors">
                        <td className="py-3 px-4 text-white">{row.term}</td>
                        <td className="py-3 px-4 text-primary-400 font-medium">{row.excellent}</td>
                        <td className="py-3 px-4 text-gray-300">{row.good}</td>
                        <td className="py-3 px-4 text-gray-300">{row.fair}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-dark-300/50">
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-white">Note:</span> Rates shown are for illustrative purposes only. Your actual rate will depend on your credit profile, loan amount, term, and other factors. Rates are subject to change without notice.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/apply" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Apply Now
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
