"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiDollarSign, FiPercent, FiCalendar, FiRepeat, FiRefreshCw, FiDownload } from "react-icons/fi";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for the component
interface LoanCalculatorProps {
  className?: string;
}

// Define types for amortization entry
interface AmortizationEntry {
  period: number;
  payment: string;
  principal: string;
  interest: string;
  balance: string;
}

export default function LoanCalculator({ className = "" }: LoanCalculatorProps) {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(4.99);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  
  // State for calculated results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // Fix hydration issues by ensuring we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Calculate payment based on frequency
  const getPaymentsPerYear = (): number => {
    switch (paymentFrequency) {
      case "weekly": return 52;
      case "biweekly": return 26;
      case "monthly": return 12;
      case "quarterly": return 4;
      default: return 12;
    }
  };

  // Calculate loan details
  useEffect(() => {
    if (!isClient) return;
    
    const calculateLoan = () => {
      const paymentsPerYear = getPaymentsPerYear();
      const totalPayments = loanTerm * (paymentsPerYear / 12);
      const periodicInterestRate = (interestRate / 100) / paymentsPerYear;
      
      // Calculate payment amount
      const payment = loanAmount * 
        (periodicInterestRate * Math.pow(1 + periodicInterestRate, totalPayments)) / 
        (Math.pow(1 + periodicInterestRate, totalPayments) - 1);
      
      const roundedPayment = isNaN(payment) ? 0 : parseFloat(payment.toFixed(2));
      setMonthlyPayment(roundedPayment);
      
      // Calculate total payments and interest
      const total = roundedPayment * totalPayments;
      setTotalPayment(parseFloat(total.toFixed(2)));
      setTotalInterest(parseFloat((total - loanAmount).toFixed(2)));
      
      // Generate amortization schedule
      generateAmortizationSchedule(loanAmount, periodicInterestRate, roundedPayment, totalPayments);
    };
    
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency, isClient]);
  
  // Generate amortization table
  const generateAmortizationSchedule = (
    principal: number, 
    rate: number, 
    payment: number, 
    periods: number
  ): void => {
    let balance = principal;
    let schedule: AmortizationEntry[] = [];
    
    for (let i = 1; i <= Math.min(periods, 360); i++) {
      const interest = balance * rate;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      
      if (balance < 0) balance = 0;
      
      // Only store first year, and then sample points
      if (i <= 12 || i % 12 === 0 || i === periods) {
        schedule.push({
          period: i,
          payment: payment.toFixed(2),
          principal: principalPaid.toFixed(2),
          interest: interest.toFixed(2),
          balance: balance.toFixed(2)
        });
      }
    }
    
    setAmortizationSchedule(schedule);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  // Prepare chart data with colors matching the screenshot
  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: [
          'rgb(26, 211, 91)',    // Bright green for principal
          'rgb(231, 57, 73)',    // Bright red for interest
        ],
        borderColor: [
          'rgb(26, 211, 91)',    // No border distinction
          'rgb(231, 57, 73)',    // No border distinction
        ],
        borderWidth: 0,
        hoverOffset: 0
      },
    ],
  };
  
  // Chart options to match the screenshot
  const chartOptions = {
    plugins: {
      legend: {
        display: false,  // We'll create our own legend below
      },
      tooltip: {
        enabled: false,  // Disable tooltips to match screenshot
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '85%',       // Much larger cutout to make a thin ring
    radius: '100%',
    rotation: 270,       // Start from the top
    circumference: 360,  // Full circle
    animation: {
      animateRotate: true,
      animateScale: false
    }
  };
  
  // Animation variants for the component
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  // Reset handler
  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(4.99);
    setLoanTerm(36);
    setPaymentFrequency("monthly");
  };

  if (!isClient) {
    return <div className="min-h-[600px] bg-gray-900 rounded-2xl shadow-lg"></div>;
  }

  return (
    <div className={`relative rounded-2xl shadow-2xl bg-gray-900 overflow-hidden ${className}`}>
      <div className="p-8 md:p-10 mt-10">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
        >
          <span className="bg-green-600 text-white p-2 rounded-lg">
            <FiDollarSign className="w-5 h-5" />
          </span>
          <span>Loan Calculator</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-7">
            <motion.div 
              variants={fadeIn} 
              initial="initial" 
              animate="animate"
              className="space-y-7 bg-gray-800/80 rounded-2xl p-7 shadow-lg border border-gray-700"
            >
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <div className="bg-green-900/30 p-1.5 rounded-lg">
                      <FiDollarSign className="text-green-400 w-4 h-4" />
                    </div>
                    Loan Amount
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(100, parseInt(e.target.value) || 0))}
                      className="w-28 px-3 py-1.5 text-right bg-gray-700 border border-gray-600 rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div className="mb-1 text-gray-200 font-medium">
                  {formatCurrency(loanAmount)}
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="500" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">$1,000</span>
                  <span className="text-xs text-gray-400">$100,000</span>
                </div>
              </div>
              
              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <div className="bg-green-900/30 p-1.5 rounded-lg">
                      <FiPercent className="text-green-400 w-4 h-4" />
                    </div>
                    Interest Rate
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      className="w-28 px-3 py-1.5 text-right bg-gray-700 border border-gray-600 rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="mb-1 text-gray-200 font-medium">
                  {interestRate}%
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="20" 
                  step="0.05" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">0.1%</span>
                  <span className="text-xs text-gray-400">20%</span>
                </div>
              </div>
              
              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <div className="bg-green-900/30 p-1.5 rounded-lg">
                      <FiCalendar className="text-green-400 w-4 h-4" />
                    </div>
                    Loan Term
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-28 px-3 py-1.5 text-right bg-gray-700 border border-gray-600 rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div className="mb-1 text-gray-200 font-medium">
                  {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="360" 
                  step="6" 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">6 mo</span>
                  <span className="text-xs text-gray-400">30 yrs</span>
                </div>
              </div>
              
              {/* Payment Frequency */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <div className="bg-green-900/30 p-1.5 rounded-lg">
                    <FiRepeat className="text-green-400 w-4 h-4" />
                  </div>
                  Payment Frequency
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <button 
                onClick={() => window.print()} 
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2.5 px-5 rounded-lg transition-all shadow border border-gray-700"
              >
                <FiDownload className="w-4 h-4" /> Print/Save
              </button>
              
              <button 
                onClick={handleReset} 
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <FiRefreshCw className="w-4 h-4" /> Reset
              </button>
            </motion.div>
          </div>
          
          {/* Results Section */}
          <motion.div 
            variants={fadeIn} 
            initial="initial" 
            animate="animate"
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-1">
                    {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-1">
                    Total Interest
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            >
              <div className="text-center">
                <div className="text-sm text-gray-300 mb-1">
                  Total Repayment Amount
                </div>
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(totalPayment)}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Principal: {formatCurrency(loanAmount)} + Interest: {formatCurrency(totalInterest)}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="bg-gray-800 rounded-xl border border-gray-700 p-5 h-80 shadow-lg"
            >
              <div className="relative h-full flex flex-col justify-center items-center">
                {/* Chart */}
                <div className="w-full h-64 relative">
                  <Pie data={chartData} options={chartOptions} />
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-sm mb-1">Total</span>
                    <span className="text-[#1ad35b] text-3xl font-bold">
                      {formatCurrency(loanAmount + totalInterest)}
                    </span>
                  </div>
                </div>
                
                {/* Custom legend to match screenshot */}
                <div className="flex items-center justify-center gap-8 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1ad35b]"></div>
                    <span className="text-white">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#e73949]"></div>
                    <span className="text-white">Interest</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Amortization Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <div className="bg-gray-700 p-1.5 rounded-lg">
              <FiCalendar className="text-green-400 w-4 h-4" />
            </div>
            Amortization Schedule
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Payment #
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Principal
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Interest
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {amortizationSchedule.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-gray-800/80' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}
                  >
                    <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-400">
                      {row.period}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-200">
                      {formatCurrency(parseFloat(row.payment))}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-sm text-green-400">
                      {formatCurrency(parseFloat(row.principal))}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-sm text-red-400">
                      {formatCurrency(parseFloat(row.interest))}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-200">
                      {formatCurrency(parseFloat(row.balance))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
