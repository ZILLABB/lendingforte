"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiCheck, FiShield, FiLock, FiPercent, 
  FiClock, FiDollarSign, FiHome, FiTrendingDown
} from "react-icons/fi";
import { 
  HiOutlineDocumentText, HiOutlineHome, HiOutlineCash, 
  HiOutlineChartBar, HiOutlineCheckCircle 
} from "react-icons/hi";

export default function MortgagePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('purchase');
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showRatePopup, setShowRatePopup] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setShowRatePopup(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
    return monthlyPayment.toFixed(2);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const mortgageTypes = [
    {
      id: 'fixed',
      title: "Fixed-Rate Mortgage",
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      description: "Lock in your rate for the entire loan term with predictable monthly payments.",
      features: [
        "Rate never changes during loan term",
        "Predictable monthly payments",
        "15, 20, and 30-year terms available",
        "Stability in fluctuating markets"
      ],
      APR: "6.25%",
      recommended: true
    },
    {
      id: 'adjustable',
      title: "Adjustable-Rate Mortgage",
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      description: "Start with a lower fixed rate that can adjust after the initial period.",
      features: [
        "Lower initial rate than fixed mortgages",
        "5/1, 7/1, and 10/1 ARM options",
        "Rate caps limit how much rates can rise",
        "Good for those who plan to sell/refinance"
      ],
      APR: "5.75%",
      recommended: false
    },
    {
      id: 'jumbo',
      title: "Jumbo Loan",
      icon: <HiOutlineCash className="w-6 h-6" />,
      description: "Finance high-value properties above conventional loan limits.",
      features: [
        "Finance luxury and high-cost properties",
        "Fixed and adjustable rate options",
        "Access to premium property markets",
        "Competitive rates for qualified borrowers"
      ],
      APR: "6.50%",
      recommended: false
    },
    {
      id: 'fha',
      title: "FHA Loan",
      icon: <HiOutlineHome className="w-6 h-6" />,
      description: "Government-backed loans with flexible qualifying requirements.",
      features: [
        "Down payments as low as 3.5%",
        "More flexible credit requirements",
        "Lower closing costs possible",
        "Great for first-time homebuyers"
      ],
      APR: "6.35%",
      recommended: false
    },
  ];

  const mortgageProcess = [
    {
      title: "Mortgage Pre-Approval",
      description: "Get pre-approved before house hunting to know your budget and strengthen your offer.",
      icon: <HiOutlineDocumentText className="w-8 h-8" />,
      timeline: "Day 1"
    },
    {
      title: "Property Search & Offer",
      description: "Find your dream home with a real estate agent and make a competitive offer.",
      icon: <HiOutlineHome className="w-8 h-8" />,
      timeline: "Weeks 1-8"
    },
    {
      title: "Mortgage Application",
      description: "Complete the full application with your property details and submit required documents.",
      icon: <FiDollarSign className="w-8 h-8" />,
      timeline: "Week 8-9"
    },
    {
      title: "Underwriting & Approval",
      description: "Our team reviews your application, verifies details, and issues formal approval.",
      icon: <FiCheck className="w-8 h-8" />,
      timeline: "Weeks 9-10"
    },
    {
      title: "Closing & Funding",
      description: "Sign final documents, pay closing costs, and receive keys to your new home.",
      icon: <FiHome className="w-8 h-8" />,
      timeline: "Week 10-11"
    },
  ];

  const testimonials = [
    {
      name: "Sarah & Michael Chen",
      role: "First-time Homebuyers",
      location: "Portland, OR",
      quote: "As first-time homebuyers, we were intimidated by the mortgage process. The team broke everything down for us and found us an incredible rate that fit our budget perfectly.",
      image: "/images/testimonials/couple1.jpg",
      rating: 5,
    },
    {
      name: "James Rodriguez",
      role: "Property Investor",
      location: "Miami, FL",
      quote: "I've financed multiple investment properties, and this was by far the smoothest mortgage process I've experienced. The jumbo loan terms were more competitive than any other lender.",
      image: "/images/testimonials/person2.jpg",
      rating: 5,
    },
    {
      name: "Olivia Thompson",
      role: "Refinance Customer",
      location: "Chicago, IL",
      quote: "Refinancing our mortgage saved us over $450 per month and let us tap some equity for a major home renovation. The entire process took less than 3 weeks!",
      image: "/images/testimonials/person3.jpg",
      rating: 5,
    },
  ];

  return (
    <div className="relative w-full bg-black dark:bg-black overflow-hidden">
      {/* Rate Alert Popup */}
      <AnimatePresence>
        {showRatePopup && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div className="bg-gray-900 dark:bg-gray-900 rounded-xl shadow-2xl border border-green-800/40 dark:border-green-800/40 p-5 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-900/30 dark:bg-green-900/30 p-3 rounded-full">
                  <FiTrendingDown className="text-green-400 dark:text-green-400 w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white dark:text-white font-bold text-lg">Rate Alert</h4>
                    <button 
                      onClick={() => setShowRatePopup(false)}
                      className="text-gray-400 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 mt-1 text-sm">
                    Mortgage rates just dropped to <span className="font-bold text-green-400 dark:text-green-400">6.25%</span> for 30-year fixed. Lock in before they rise again!
                  </p>
                  <div className="mt-3">
                    <Link 
                      href="/mortgage/rates"
                      className="text-sm font-medium text-green-400 hover:text-green-300 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center"
                    >
                      View current rates <FiArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32 min-h-[85vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>
          
          <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-green-900/10 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-emerald-900/10 dark:bg-emerald-900/10 rounded-full blur-3xl"></div>
          
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-900/10 dark:bg-green-900/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-emerald-900/10 dark:bg-emerald-900/10 rounded-full blur-2xl"></div>
          
          <div className="hidden lg:block absolute right-[5%] bottom-[10%] w-64 h-64">
            <Image
              src="/images/mortgage/house-illustration.png"
              alt="House illustration"
              width={250}
              height={250}
              className="w-full h-full object-contain opacity-20 dark:opacity-10"
            />
          </div>
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 z-10 relative"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center mb-6 space-x-3">
                <span className="inline-block px-3 py-1 bg-green-900/40 dark:bg-green-900/40 text-green-400 dark:text-green-400 text-sm font-medium rounded-full">
                  Limited Time
                </span>
                <span className="text-gray-300 dark:text-gray-300 text-sm font-medium">
                  Rates starting at 6.25% APR
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
                <span className="block">Turn Your House</span>
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 dark:from-green-400 dark:via-green-500 dark:to-emerald-600 bg-clip-text text-transparent">
                  Into Your Dream Home
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300 mb-8 max-w-xl">
                Find the perfect mortgage solution with competitive rates, personalized service, and a seamless digital experience.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link 
                  href="/mortgage/calculator" 
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-lg hover:shadow-green-900/20 flex items-center"
                >
                  Calculate Payment <FiArrowRight className="ml-2" />
                </Link>
                <Link 
                  href="/mortgage/pre-approval" 
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg font-medium transition-colors border border-gray-700 hover:border-gray-600"
                >
                  Get Pre-Approved
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center text-gray-300">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>No-obligation rate check</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>5-star customer service</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 dark:border-gray-700">
                <div className="p-6 bg-gray-900 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-700">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-xl font-bold text-white">Mortgage Calculator</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveTab('purchase')} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          activeTab === 'purchase' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Purchase
                      </button>
                      <button 
                        onClick={() => setActiveTab('refinance')} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          activeTab === 'refinance' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Refinance
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-300 font-medium">Loan Amount</label>
                      <span className="text-green-400 font-medium">${loanAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50000" 
                      max="1000000" 
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">$50,000</span>
                      <span className="text-xs text-gray-400">$1,000,000</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-300 font-medium">Interest Rate</label>
                      <span className="text-green-400 font-medium">{interestRate}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="10" 
                      step="0.125"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">2%</span>
                      <span className="text-xs text-gray-400">10%</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-300 font-medium">Loan Term</label>
                      <span className="text-green-400 font-medium">{loanTerm} years</span>
                    </div>
                    <div className="flex gap-2">
                      {[15, 20, 30].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                            loanTerm === term 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {term} years
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white">Monthly Payment</h4>
                      <div className="text-2xl font-bold text-white">${calculateMonthlyPayment()}</div>
                    </div>
                    <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-400">Principal & Interest</p>
                        <p className="text-white font-medium">${calculateMonthlyPayment()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Interest</p>
                        <p className="text-white font-medium">
                          ${(Number(calculateMonthlyPayment()) * loanTerm * 12 - loanAmount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/mortgage/pre-approval"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium text-center transition-colors"
                  >
                    Get Pre-Approved
                  </Link>
                  <p className="text-gray-400 text-center text-xs mt-3">
                    This is an estimate. Your actual payment may vary.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Mortgage Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 dark:bg-green-900/30 text-green-400 dark:text-green-400 text-sm font-medium mb-4">
              Mortgage Options
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Find the <span className="text-green-400 dark:text-green-400">Perfect Mortgage</span> for Your Needs
            </h2>
            <p className="text-gray-300 dark:text-gray-300 text-lg">
              Compare our mortgage options to find the loan that best fits your homebuying goals and financial situation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mortgageTypes.map((type, index) => (
              <motion.div
                key={type.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-700 shadow-lg relative"
              >
                {type.recommended && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      RECOMMENDED
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="p-3 bg-green-900/30 dark:bg-green-900/30 rounded-lg w-fit mb-4">
                    {type.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-300 mb-4">{type.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700 dark:border-gray-700">
                    <div>
                      <p className="text-gray-400 text-xs">Starting at</p>
                      <p className="text-xl font-bold text-green-400 dark:text-green-400">{type.APR} APR</p>
                    </div>
                    
                    <Link
                      href={`/mortgage/${type.id}`}
                      className="inline-flex items-center font-medium text-green-400 dark:text-green-400 hover:text-green-300 dark:hover:text-green-300"
                    >
                      Learn More <FiArrowRight className="ml-1.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Timeline Section */}
      <section className="py-20 bg-black/60 dark:bg-black/60">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-900/30 dark:bg-green-900/30 text-green-400 dark:text-green-400 mb-4">
              <HiOutlineDocumentText className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The <span className="text-green-400 dark:text-green-400">Mortgage Process</span> Simplified
            </h2>
            <p className="text-gray-300 dark:text-gray-300 text-lg">
              We've streamlined the journey to homeownership to make it clear and straightforward.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-green-900/30 dark:bg-green-900/30 hidden md:block"></div>
              
              {/* Timeline Steps */}
              <div className="space-y-8">
                {mortgageProcess.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 z-10">
                      <div className="w-8 h-8 rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 dark:border-gray-700">
                        <div className="flex items-center mb-2">
                          <div className="p-2 bg-green-900/30 dark:bg-green-900/30 rounded-lg text-green-400 dark:text-green-400 mr-3">
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-sm text-green-400 dark:text-green-400 font-medium">{step.timeline}</p>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-300 dark:text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link 
                href="/mortgage/application"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-12 text-center shadow-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -mb-10 -ml-10"></div>
            
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Ready to Get Started?
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Find Your Perfect Mortgage Today
            </h2>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
              Check your rate in 3 minutes with no impact to your credit score. Get pre-approved and shop with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mortgage/pre-approval" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Check My Rate
              </Link>
              <Link href="/mortgage/advisor" className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Speak With a Mortgage Advisor
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-white">
                <FiShield className="mr-2" />
                <span>FDIC Insured</span>
              </div>
              <div className="flex items-center text-white">
                <FiLock className="mr-2" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center text-white">
                <FiCheck className="mr-2" />
                <span>Trusted by 100,000+ Homeowners</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
