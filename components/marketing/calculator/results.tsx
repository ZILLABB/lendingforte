'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { 
  ArrowDownTrayIcon, 
  PrinterIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';
import { useToast } from '@/components/providers/toast-provider';

// Sample data for demonstration
const sampleLoanData = {
  loanAmount: 25000,
  downPayment: 0,
  loanTerm: 36,
  interestRate: 5.99,
  monthlyPayment: 760.02,
  totalInterest: 2360.72,
  totalPayment: 27360.72,
  amortizationSchedule: Array.from({ length: 36 }, (_, i) => ({
    month: i + 1,
    payment: 760.02,
    principal: i === 0 ? 635.02 : 640 + i * 2,
    interest: i === 0 ? 125.00 : 120 - i * 0.5,
    balance: 25000 - (i === 0 ? 635.02 : (640 + i * 2) * i)
  }))
};

export default function CalculatorResults() {
  const [activeTab, setActiveTab] = useState(0);
  const toast = useToast();
  
  // Function to handle exporting data
  const handleExport = () => {
    toast.info('Export functionality would be implemented here');
  };
  
  // Function to handle printing
  const handlePrint = () => {
    toast.info('Print functionality would be implemented here');
  };
  
  // Function to handle sharing
  const handleShare = () => {
    toast.info('Share functionality would be implemented here');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Results</h2>
          
          <div className="flex space-x-2">
            <button
              onClick={handleExport}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
              title="Export"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
              title="Print"
            >
              <PrinterIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
              title="Share"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Monthly Payment</p>
            <p className="text-2xl font-semibold text-white">${sampleLoanData.monthlyPayment.toFixed(2)}</p>
          </div>
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Total Interest</p>
            <p className="text-2xl font-semibold text-white">${sampleLoanData.totalInterest.toFixed(2)}</p>
          </div>
          <div className="bg-dark-200 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Total Payment</p>
            <p className="text-2xl font-semibold text-white">${sampleLoanData.totalPayment.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Tabs */}
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-dark-200 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-colors ${
                  selected
                    ? 'bg-primary-500 text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-dark-100'
                }`
              }
            >
              Payment Chart
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-colors ${
                  selected
                    ? 'bg-primary-500 text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-dark-100'
                }`
              }
            >
              Amortization
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-colors ${
                  selected
                    ? 'bg-primary-500 text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-dark-100'
                }`
              }
            >
              Loan Details
            </Tab>
          </Tab.List>
          
          <Tab.Panels>
            {/* Payment Chart Panel */}
            <Tab.Panel>
              <div className="bg-dark-200 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">Payment Chart Visualization</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Chart visualization would be implemented here)
                  </p>
                </div>
              </div>
            </Tab.Panel>
            
            {/* Amortization Schedule Panel */}
            <Tab.Panel>
              <div className="bg-dark-200 rounded-xl p-4 max-h-64 overflow-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-dark-100">
                    <tr>
                      <th className="py-2 px-3 text-left">Month</th>
                      <th className="py-2 px-3 text-right">Payment</th>
                      <th className="py-2 px-3 text-right">Principal</th>
                      <th className="py-2 px-3 text-right">Interest</th>
                      <th className="py-2 px-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100">
                    {sampleLoanData.amortizationSchedule.slice(0, 10).map((row) => (
                      <tr key={row.month} className="text-gray-300">
                        <td className="py-2 px-3">{row.month}</td>
                        <td className="py-2 px-3 text-right">${row.payment.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right">${row.principal.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right">${row.interest.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center mt-4 text-sm text-gray-400">
                  Showing 10 of {sampleLoanData.amortizationSchedule.length} months
                </div>
              </div>
            </Tab.Panel>
            
            {/* Loan Details Panel */}
            <Tab.Panel>
              <div className="bg-dark-200 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-dark-100 pb-2">
                    <span className="text-gray-400">Loan Amount</span>
                    <span className="text-white font-medium">${sampleLoanData.loanAmount.toLocaleString()}</span>
                  </div>
                  
                  {sampleLoanData.downPayment > 0 && (
                    <div className="flex justify-between border-b border-dark-100 pb-2">
                      <span className="text-gray-400">Down Payment</span>
                      <span className="text-white font-medium">${sampleLoanData.downPayment.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between border-b border-dark-100 pb-2">
                    <span className="text-gray-400">Loan Term</span>
                    <span className="text-white font-medium">{sampleLoanData.loanTerm} months ({(sampleLoanData.loanTerm / 12).toFixed(1)} years)</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-dark-100 pb-2">
                    <span className="text-gray-400">Interest Rate</span>
                    <span className="text-white font-medium">{sampleLoanData.interestRate}%</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-dark-100 pb-2">
                    <span className="text-gray-400">Monthly Payment</span>
                    <span className="text-white font-medium">${sampleLoanData.monthlyPayment.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-dark-100 pb-2">
                    <span className="text-gray-400">Total Interest</span>
                    <span className="text-white font-medium">${sampleLoanData.totalInterest.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Payment</span>
                    <span className="text-white font-medium">${sampleLoanData.totalPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        
        <div className="mt-8 text-center">
          <a 
            href="/apply" 
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Apply With These Terms
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
