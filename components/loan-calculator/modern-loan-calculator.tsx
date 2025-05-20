"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FiDollarSign,
  FiPercent,
  FiCalendar,
  FiRepeat,
  FiRefreshCw,
  FiDownload,
  FiInfo,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

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

// Define types for loan scenario
interface LoanScenario {
  id: string;
  name: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: string;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function ModernLoanCalculator({ className = "" }: LoanCalculatorProps) {
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

  // State for UI interactions
  const [showAmortizationTable, setShowAmortizationTable] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<LoanScenario[]>([]);
  const [showScenarios, setShowScenarios] = useState<boolean>(false);

  // Fix hydration issues by ensuring we're on the client
  useEffect(() => {
    setIsClient(true);

    // Load saved scenarios from localStorage if available
    const savedScenariosData = localStorage.getItem('loanCalculatorScenarios');
    if (savedScenariosData) {
      try {
        setSavedScenarios(JSON.parse(savedScenariosData));
      } catch (e) {
        console.error('Failed to parse saved scenarios:', e);
      }
    }
  }, []);

  // Calculate payment based on frequency
  const getPaymentsPerYear = useCallback((): number => {
    switch (paymentFrequency) {
      case "weekly": return 52;
      case "biweekly": return 26;
      case "monthly": return 12;
      case "quarterly": return 4;
      default: return 12;
    }
  }, [paymentFrequency]);

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

      const roundedPayment = isNaN(payment) || !isFinite(payment) ? 0 : parseFloat(payment.toFixed(2));
      setMonthlyPayment(roundedPayment);

      // Calculate total payments and interest
      const total = roundedPayment * totalPayments;
      setTotalPayment(parseFloat(total.toFixed(2)));
      setTotalInterest(parseFloat((total - loanAmount).toFixed(2)));

      // Generate amortization schedule
      generateAmortizationSchedule(loanAmount, periodicInterestRate, roundedPayment, totalPayments);
    };

    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency, isClient, getPaymentsPerYear]);

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

  // Save current scenario
  const saveCurrentScenario = () => {
    const newScenario: LoanScenario = {
      id: Date.now().toString(),
      name: `Scenario ${savedScenarios.length + 1}`,
      loanAmount,
      interestRate,
      loanTerm,
      paymentFrequency,
      monthlyPayment,
      totalPayment,
      totalInterest
    };

    const updatedScenarios = [...savedScenarios, newScenario];
    setSavedScenarios(updatedScenarios);

    // Save to localStorage
    localStorage.setItem('loanCalculatorScenarios', JSON.stringify(updatedScenarios));

    // Show scenarios panel
    setShowScenarios(true);
  };

  // Load a saved scenario
  const loadScenario = (scenario: LoanScenario) => {
    setLoanAmount(scenario.loanAmount);
    setInterestRate(scenario.interestRate);
    setLoanTerm(scenario.loanTerm);
    setPaymentFrequency(scenario.paymentFrequency);
  };

  // Delete a saved scenario
  const deleteScenario = (id: string) => {
    const updatedScenarios = savedScenarios.filter(scenario => scenario.id !== id);
    setSavedScenarios(updatedScenarios);

    // Update localStorage
    localStorage.setItem('loanCalculatorScenarios', JSON.stringify(updatedScenarios));
  };

  // Reset form to default values
  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(4.99);
    setLoanTerm(36);
    setPaymentFrequency("monthly");
  };

  if (!isClient) {
    return <div className="min-h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg"></div>;
  }

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
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 1)',    // Solid emerald on hover
          'rgba(239, 68, 68, 1)',     // Solid red on hover
        ],
        hoverBorderColor: [
          'rgb(4, 120, 87)',
          'rgb(185, 28, 28)',
        ],
        hoverBorderWidth: 2,
      },
    ],
  };

  // Chart options with enhanced styling
  const chartOptions = {
    plugins: {
      legend: {
        display: false,  // We'll create our own legend
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
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
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
    cutout: '75%', // Larger cutout for a more modern look
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
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Render the component
  return (
    <div className={`relative rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden backdrop-blur-sm ${className}`}>
      <div className="p-6 md:p-8 lg:p-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-2xl font-bold text-white mb-8 flex items-center gap-3"
        >
          <span className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg shadow-lg">
            <FiDollarSign className="w-5 h-5 text-white" />
          </span>
          <span>Loan Calculator</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700"
            >
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <div className="bg-emerald-900/30 p-1.5 rounded-lg">
                      <FiDollarSign className="text-emerald-400 w-4 h-4" />
                    </div>
                    <span>Loan Amount</span>
                    <Tippy
                      content="The total amount of money you wish to borrow"
                      animation="shift-away"
                      placement="top"
                      theme="translucent"
                    >
                      <span className="cursor-help text-gray-500 hover:text-gray-300 transition-colors">
                        <FiInfo className="w-3.5 h-3.5" />
                      </span>
                    </Tippy>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(100, parseInt(e.target.value) || 0))}
                      onFocus={() => setActiveInput('loanAmount')}
                      onBlur={() => setActiveInput(null)}
                      className={`w-28 px-3 py-1.5 text-right bg-gray-700 border ${activeInput === 'loanAmount' ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-600'} rounded-lg text-gray-200 text-sm focus:outline-none transition-all duration-300`}
                    />
                  </div>
                </div>
                <div className="mb-2 text-gray-200 font-medium">
                  {formatCurrency(loanAmount)}
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
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
                    <div className="bg-emerald-900/30 p-1.5 rounded-lg">
                      <FiPercent className="text-emerald-400 w-4 h-4" />
                    </div>
                    <span>Interest Rate</span>
                    <Tippy
                      content="The annual interest rate for this loan"
                      animation="shift-away"
                      placement="top"
                      theme="translucent"
                    >
                      <span className="cursor-help text-gray-500 hover:text-gray-300 transition-colors">
                        <FiInfo className="w-3.5 h-3.5" />
                      </span>
                    </Tippy>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      onFocus={() => setActiveInput('interestRate')}
                      onBlur={() => setActiveInput(null)}
                      className={`w-28 px-3 py-1.5 text-right bg-gray-700 border ${activeInput === 'interestRate' ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-600'} rounded-lg text-gray-200 text-sm focus:outline-none transition-all duration-300`}
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="mb-2 text-gray-200 font-medium">
                  {interestRate}%
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="20"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
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
                    <div className="bg-emerald-900/30 p-1.5 rounded-lg">
                      <FiCalendar className="text-emerald-400 w-4 h-4" />
                    </div>
                    <span>Loan Term</span>
                    <Tippy
                      content="The length of time to repay the loan in months"
                      animation="shift-away"
                      placement="top"
                      theme="translucent"
                    >
                      <span className="cursor-help text-gray-500 hover:text-gray-300 transition-colors">
                        <FiInfo className="w-3.5 h-3.5" />
                      </span>
                    </Tippy>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 0))}
                      onFocus={() => setActiveInput('loanTerm')}
                      onBlur={() => setActiveInput(null)}
                      className={`w-28 px-3 py-1.5 text-right bg-gray-700 border ${activeInput === 'loanTerm' ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-600'} rounded-lg text-gray-200 text-sm focus:outline-none transition-all duration-300`}
                    />
                  </div>
                </div>
                <div className="mb-2 text-gray-200 font-medium">
                  {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                </div>
                <input
                  type="range"
                  min="6"
                  max="360"
                  step="6"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">6 mo</span>
                  <span className="text-xs text-gray-400">30 yrs</span>
                </div>
              </div>

              {/* Payment Frequency */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <div className="bg-emerald-900/30 p-1.5 rounded-lg">
                    <FiRepeat className="text-emerald-400 w-4 h-4" />
                  </div>
                  <span>Payment Frequency</span>
                  <Tippy
                    content="How often you'll make payments on this loan"
                    animation="shift-away"
                    placement="top"
                    theme="translucent"
                  >
                    <span className="cursor-help text-gray-500 hover:text-gray-300 transition-colors">
                      <FiInfo className="w-3.5 h-3.5" />
                    </span>
                  </Tippy>
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                  onFocus={() => setActiveInput('paymentFrequency')}
                  onBlur={() => setActiveInput(null)}
                  className={`w-full px-4 py-2.5 bg-gray-700 border ${activeInput === 'paymentFrequency' ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-600'} rounded-lg text-gray-200 focus:outline-none transition-all duration-300`}
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
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2.5 px-5 rounded-lg transition-all shadow border border-gray-700 hover:shadow-md"
              >
                <FiDownload className="w-4 h-4" /> Print/Save
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2.5 px-5 rounded-lg transition-all shadow border border-gray-700 hover:shadow-md"
              >
                <FiRefreshCw className="w-4 h-4" /> Reset
              </button>

              <button
                onClick={saveCurrentScenario}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <FiBarChart2 className="w-4 h-4" /> Save Scenario
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
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-700 hover:border-emerald-500/50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1.5">
                    <FiRepeat className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(monthlyPayment)}
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg border border-gray-700 hover:border-red-500/50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1.5">
                    <FiPercent className="w-3.5 h-3.5 text-red-400" />
                    <span>Total Interest</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700"
            >
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1.5">
                  <FiDollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Total Repayment Amount</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  {formatCurrency(totalPayment)}
                </div>
                <div className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-4">
                  <span>Principal: {formatCurrency(loanAmount)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>Interest: {formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 shadow-lg h-80"
            >
              <div className="relative h-full flex flex-col justify-center items-center">
                {/* Chart */}
                <div className="w-full h-64 relative">
                  <Doughnut data={chartData} options={chartOptions} />

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-sm mb-1">Total</span>
                    <span className="text-emerald-400 text-3xl font-bold">
                      {formatCurrency(loanAmount + totalInterest)}
                    </span>
                  </div>
                </div>

                {/* Custom legend */}
                <div className="flex items-center justify-center gap-8 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/80"></div>
                    <span className="text-gray-300">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/80"></div>
                    <span className="text-gray-300">Interest</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Amortization Table */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-1.5 rounded-lg shadow-md">
                <FiCalendar className="w-4 h-4 text-white" />
              </div>
              <span>Amortization Schedule</span>
            </motion.h3>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={() => setShowAmortizationTable(!showAmortizationTable)}
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
            >
              {showAmortizationTable ? (
                <>
                  <span>Hide Details</span>
                  <FiChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <FiChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showAmortizationTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
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
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className={`${index % 2 === 0 ? 'bg-gray-800/80' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}
                        >
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-400">
                            {row.period}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-200">
                            {formatCurrency(parseFloat(row.payment))}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm text-emerald-400">
                            {formatCurrency(parseFloat(row.principal))}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm text-red-400">
                            {formatCurrency(parseFloat(row.interest))}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-200">
                            {formatCurrency(parseFloat(row.balance))}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Saved Scenarios */}
        <AnimatePresence>
          {showScenarios && savedScenarios.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-1.5 rounded-lg shadow-md">
                    <FiBarChart2 className="w-4 h-4 text-white" />
                  </div>
                  <span>Saved Scenarios</span>
                </h3>

                <button
                  onClick={() => setShowScenarios(!showScenarios)}
                  className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span>Hide</span>
                  <FiChevronUp className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedScenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-200">{scenario.name}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadScenario(scenario)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                          title="Load this scenario"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteScenario(scenario.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete this scenario"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-gray-200">{formatCurrency(scenario.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-gray-200">{scenario.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Term:</span>
                        <span className="text-gray-200">{scenario.loanTerm} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment:</span>
                        <span className="text-emerald-400">{formatCurrency(scenario.monthlyPayment)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
