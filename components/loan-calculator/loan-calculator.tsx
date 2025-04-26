"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiDownload, FiRefreshCw, FiDollarSign, FiPercent, FiCalendar, FiRepeat } from "react-icons/fi";

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
  
  // Prepare chart data with improved colors
  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // Emerald with transparency
          'rgba(239, 68, 68, 0.8)',   // Red with transparency
        ],
        borderColor: [
          'rgb(4, 120, 87)',          // Darker emerald
          'rgb(185, 28, 28)',         // Darker red
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 1)',    // Solid emerald on hover
          'rgba(239, 68, 68, 1)',     // Solid red on hover
        ],
        hoverBorderColor: [
          'rgb(4, 120, 87)',
          'rgb(185, 28, 28)',
        ],
        hoverBorderWidth: 3,
      },
    ],
  };
  
  // Chart options with enhanced styling
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#6b7280',
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold' as const
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = formatCurrency(context.raw);
            const percentage = ((context.raw / (loanAmount + totalInterest)) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        },
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        bodySpacing: 6,
        boxPadding: 6
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%', // Convert to doughnut chart for better appearance
    radius: '90%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  
  // Reset form to default values
  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(4.99);
    setLoanTerm(36);
    setPaymentFrequency("monthly");
  };

  if (!isClient) {
    return <div className="min-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg"></div>;
  }

  return (
    <div className={`relative rounded-2xl shadow-xl bg-white dark:bg-gray-800 overflow-hidden backdrop-blur-sm ${className}`}>
      <div className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"
        >
          <FiDollarSign className="text-emerald-500" />
          <span>Loan Calculator</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <motion.div 
              variants={fadeIn} 
              initial="initial" 
              animate="animate"
              className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700"
            >
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <FiDollarSign className="text-emerald-500" />
                    Loan Amount: {formatCurrency(loanAmount)}
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(100, parseInt(e.target.value) || 0))}
                      className="w-24 px-3 py-1 text-right bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="500" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">$1,000</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">$100,000</span>
                </div>
              </div>
              
              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <FiPercent className="text-emerald-500" />
                    Interest Rate: {interestRate}%
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      className="w-24 px-3 py-1 text-right bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                      step="0.01"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="30" 
                  step="0.05" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">0.1%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">30%</span>
                </div>
              </div>
              
              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <FiCalendar className="text-emerald-500" />
                    Loan Term: {loanTerm} months
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-24 px-3 py-1 text-right bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="360" 
                  step="6" 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">6 mo</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">30 yrs</span>
                </div>
              </div>
              
              {/* Payment Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                  <FiRepeat className="text-emerald-500" />
                  Payment Frequency
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
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
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/30 rounded-xl p-4 shadow-md border border-emerald-100 dark:border-emerald-900/50"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Total Interest
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-lg"
            >
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Total Repayment Amount
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 inline-block text-transparent bg-clip-text">
                  {formatCurrency(totalPayment)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Principal: {formatCurrency(loanAmount)} + Interest: {formatCurrency(totalInterest)}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 h-52 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-full flex justify-center items-center">
                <Pie data={chartData} options={chartOptions} />
                {/* Add total amount in center of doughnut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {formatCurrency(loanAmount + totalInterest)}
                  </span>
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
          className="mt-8"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiCalendar className="text-emerald-500" />
            Amortization Schedule
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payment #
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Principal
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Interest
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {amortizationSchedule.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/20' : ''} hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {row.period}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {formatCurrency(parseFloat(row.payment))}
                    </td>
                    <td className="px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(parseFloat(row.principal))}
                    </td>
                    <td className="px-4 py-2 text-sm text-red-600 dark:text-red-400">
                      {formatCurrency(parseFloat(row.interest))}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {formatCurrency(parseFloat(row.balance))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-5 rounded-lg transition-all shadow-sm hover:shadow"
          >
            <FiDownload className="w-4 h-4" /> Print/Save
          </button>
          
          <button 
            onClick={handleReset} 
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium py-2.5 px-5 rounded-lg transition-all shadow-sm hover:shadow"
          >
            <FiRefreshCw className="w-4 h-4" /> Reset
          </button>
        </motion.div>
      </div>
    </div>
  );
}
