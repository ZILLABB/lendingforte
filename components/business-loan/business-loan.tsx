"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiCheck, FiShield, FiLock, FiPercent, 
  FiClock, FiDollarSign, FiTrendingUp, FiBriefcase, FiInfo, FiCheckCircle 
} from "react-icons/fi";
import { 
  HiOutlineOfficeBuilding, HiOutlineCash, HiOutlineChartBar, 
  HiOutlineDocumentText, HiOutlineCurrencyDollar 
} from "react-icons/hi";

export default function BusinessLoanPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('term');
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(7.25);
  const [loanTerm, setLoanTerm] = useState(60);
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
    const numberOfPayments = loanTerm;
    
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

  const businessLoanTypes = [
    {
      id: 'term',
      title: "Term Loan",
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      description: "Traditional business loans with predictable monthly payments and competitive rates.",
      features: [
        "Loan amounts from $25,000 to $1,000,000",
        "Terms from 1 to 5 years",
        "Fixed interest rates",
        "No pre-payment penalties"
      ],
      APR: "7.25%",
      recommended: true
    },
    {
      id: 'line-of-credit',
      title: "Business Line of Credit",
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      description: "Flexible financing that allows you to borrow funds as needed and only pay interest on what you use.",
      features: [
        "Credit lines up to $500,000",
        "Draw funds as needed",
        "Pay interest only on what you use",
        "Funds replenish as you repay"
      ],
      APR: "8.99%",
      recommended: false
    },
    {
      id: 'equipment',
      title: "Equipment Financing",
      icon: <HiOutlineOfficeBuilding className="w-6 h-6" />,
      description: "Finance new or used equipment with the equipment itself serving as collateral.",
      features: [
        "Up to 100% of equipment value",
        "Terms up to 7 years",
        "Fixed monthly payments",
        "Potential tax benefits"
      ],
      APR: "6.75%",
      recommended: false
    },
    {
      id: 'sba',
      title: "SBA Loans",
      icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
      description: "Government-backed loans with favorable terms for small businesses.",
      features: [
        "Loan amounts up to $5,000,000",
        "Lower down payments",
        "Longer repayment terms",
        "Competitive interest rates"
      ],
      APR: "6.25%",
      recommended: false
    },
  ];

  const loanProcess = [
    {
      title: "Quick Application",
      description: "Complete our streamlined online application in 10 minutes with basic business information.",
      icon: <HiOutlineDocumentText className="w-8 h-8" />,
      timeline: "Day 1"
    },
    {
      title: "Document Submission",
      description: "Upload required documents including business financials, tax returns, and bank statements.",
      icon: <FiDollarSign className="w-8 h-8" />,
      timeline: "Day 1-2"
    },
    {
      title: "Underwriting",
      description: "Our team reviews your application and documents to determine loan eligibility and terms.",
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      timeline: "Day 2-3"
    },
    {
      title: "Approval & Offer",
      description: "Receive a loan offer with detailed terms, rates, and payment schedule for your review.",
      icon: <FiCheck className="w-8 h-8" />,
      timeline: "Day 3-4"
    },
    {
      title: "Funding",
      description: "After accepting the offer and signing documents, funds are deposited directly to your account.",
      icon: <FiBriefcase className="w-8 h-8" />,
      timeline: "Day 4-5"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Johnson Manufacturing Co.",
      quote: "The business loan allowed us to purchase new equipment and increase production by 40% within just three months.",
      amount: 250000,
      usedFor: "Equipment Purchase"
    },
    {
      name: "Michael Rodriguez",
      business: "Eastside Auto Repair",
      quote: "We were able to open a second location and hire five new mechanics. Our revenue has doubled since securing funding.",
      amount: 175000,
      usedFor: "Business Expansion"
    },
    {
      name: "Jennifer Chen",
      business: "Bloom Retail Group",
      quote: "The line of credit helped us manage seasonal inventory purchases without affecting our day-to-day operations.",
      amount: 100000,
      usedFor: "Inventory & Working Capital"
    }
  ];

  const faqItems = [
    {
      question: "How much can I borrow for my business?",
      answer: "Our business loans range from $25,000 to $1,000,000 depending on your business revenue, time in business, and credit profile. Most qualified businesses are eligible to borrow up to 10-15% of their annual revenue."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You'll typically need to provide 3-6 months of business bank statements, basic business information, your last two years of business tax returns, and a simple one-page application. SBA loans may require additional documentation."
    },
    {
      question: "How long does the application process take?",
      answer: "Our streamlined application can be completed in about 10 minutes. Most applicants receive a decision within 24 hours, and funding can be available as quickly as 1-3 business days after approval."
    },
    {
      question: "Do I need collateral for a business loan?",
      answer: "Many of our business loan options do not require specific collateral. However, all business loans do require a personal guarantee from the primary business owner(s), and some loan types may require business assets as collateral."
    },
    {
      question: "What credit score do I need to qualify?",
      answer: "While we consider multiple factors beyond just credit scores, business owners with personal credit scores above 650 typically qualify for our most competitive rates. However, we have financing options available for credit scores as low as 580."
    }
  ];

  const industries = [
    "Retail", "Healthcare", "Technology", "Manufacturing", "Construction", 
    "Professional Services", "Restaurant", "Automotive", "Transportation", 
    "Real Estate", "Wholesale", "Education"
  ];

  return (
    <div className="bg-black text-white">
      {/* Floating Rate Alert */}
      <AnimatePresence>
        {showRatePopup && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-5 right-5 z-50 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 shadow-xl max-w-md"
          >
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FiPercent className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white">Limited Time Offer</h4>
                <p className="text-green-100 text-sm mb-2">Business loans starting at 6.25% APR for qualified applicants</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowRatePopup(false)}
                    className="text-xs text-green-200 hover:text-white"
                  >
                    Dismiss
                  </button>
                  <Link 
                    href="/business-loan/special-offer" 
                    className="text-xs font-medium text-white hover:text-green-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <button 
                onClick={() => setShowRatePopup(false)}
                className="ml-4 text-white/70 hover:text-white"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/business-loan/business-owner.jpg"
            alt="Business owner working"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-20 pb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            >
              Business Funding <span className="text-green-400">Solutions</span> <br />
              Tailored to Your Growth
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Access the capital your business needs with flexible terms, 
              competitive rates, and a simple application process designed for busy entrepreneurs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/business-loan/application" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg">
                Check Your Rate
              </Link>
              <Link href="/business-loan/options" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-colors backdrop-blur-sm">
                Explore Loan Options
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8 py-6 px-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-gray-800 max-w-2xl mx-auto"
            >
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li className="flex items-center">
                  <FiClock className="mr-3 text-green-400 flex-shrink-0" />
                  <p className="text-gray-300">Funding in as little as 48 hours</p>
                </li>
                <li className="flex items-center">
                  <FiDollarSign className="mr-3 text-green-400 flex-shrink-0" />
                  <p className="text-gray-300">Loans from $10K to $5M</p>
                </li>
                <li className="flex items-center">
                  <FiLock className="mr-3 text-green-400 flex-shrink-0" />
                  <p className="text-gray-300">Check rates with no credit impact</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <p className="text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div 
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5 
                }}
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Loan Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Flexible Financing Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose the Right <span className="text-green-400">Business Loan</span> for Your Needs
            </h2>
            <p className="text-gray-300 text-lg">
              We offer a variety of business financing options designed to address different business challenges and opportunities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessLoanTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg relative"
              >
                {type.recommended && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      RECOMMENDED
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="p-3 bg-green-900/30 rounded-lg w-fit mb-4">
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
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-gray-400 text-xs">Starting at</p>
                      <p className="text-xl font-bold text-green-400">{type.APR} APR</p>
                    </div>
                    
                    <Link
                      href={`/business-loan/${type.id}`}
                      className="inline-flex items-center font-medium text-green-400 hover:text-green-300"
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
      
      {/* Calculator Section */}
      <section className="py-20 bg-black/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
                Business Loan Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Estimate Your <span className="text-green-400">Monthly Payments</span>
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                See how different loan amounts, terms, and rates affect your monthly payments before you apply.
              </p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Loan Amount</label>
                    <span className="text-green-400 font-medium">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>$10,000</span>
                    <span>$5,000,000</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Interest Rate</label>
                    <span className="text-green-400 font-medium">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>4%</span>
                    <span>24%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Loan Term (months)</label>
                    <span className="text-green-400 font-medium">{loanTerm} months</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="120"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>3 months</span>
                    <span>120 months</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-white mb-6">Loan Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-300">Loan Amount</span>
                  <span className="text-white font-medium">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Interest Rate</span>
                  <span className="text-white font-medium">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Loan Term</span>
                  <span className="text-white font-medium">{loanTerm} months</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-white">Monthly Payment</span>
                    <span className="text-green-400 text-2xl font-bold">${calculateMonthlyPayment()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-900/20 p-4 rounded-lg mb-6">
                <div className="flex">
                  <FiInfo className="text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300">
                    This is an estimate only. Your actual rate and payment may vary based on your business profile and credit.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/loan-application" 
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
              >
                Apply Now
              </Link>
              
              <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                <FiLock className="mr-2 text-green-400" />
                <span>Checking rates won't affect your credit score</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Process Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-900/30 text-green-400 mb-4">
              <HiOutlineDocumentText className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The <span className="text-green-400">Loan Process</span> Simplified
            </h2>
            <p className="text-gray-300 text-lg">
              We've streamlined the business loan process to get you funded quickly with minimal paperwork.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-green-900/30 hidden md:block"></div>
              
              {/* Timeline Steps */}
              <div className="space-y-8">
                {loanProcess.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 z-10">
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
                        <div className="flex items-center mb-2">
                          <div className="p-2 bg-green-900/30 rounded-lg text-green-400 mr-3">
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-sm text-green-400 font-medium">{step.timeline}</p>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link 
                href="/business-loan/application"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-20 bg-black/60">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Industry Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Business Loans for <span className="text-green-400">Every Industry</span>
            </h2>
            <p className="text-gray-300 text-lg">
              We understand the unique financial needs of different industries and tailor our financing solutions accordingly.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <p className="text-white font-medium">{industry}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10"
          >
            <Link href="/business-loan/industries" className="text-green-400 hover:text-green-300 font-medium inline-flex items-center">
              View Industry-Specific Solutions <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4"
            >
              Customer Stories
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Helping Businesses <span className="text-green-400">Achieve More</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300"
            >
              Read how our business loans have helped companies like yours grow and succeed.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 relative"
              >
                {/* Quotation mark decorative element */}
                <div className="absolute top-6 right-6 text-green-900/30">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 25H7.5L12.5 12.5H20L17.5 25ZM37.5 25H27.5L32.5 12.5H40L37.5 25Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-green-400 text-sm">{testimonial.business}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 mr-2">Funding:</span>
                    <span className="text-white">${testimonial.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-gray-400 mr-2">Used for:</span>
                    <span className="text-white">{testimonial.usedFor}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/business-loan/case-studies" className="text-green-400 hover:text-green-300 font-medium inline-flex items-center">
              View All Success Stories <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Loan Comparison Table */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Compare Options
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find the Right <span className="text-green-400">Financing Solution</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Compare our business loan options to find the best fit for your specific needs.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-6 py-4 text-white font-semibold">Loan Type</th>
                    <th className="px-6 py-4 text-white font-semibold">Amount Range</th>
                    <th className="px-6 py-4 text-white font-semibold">Term Length</th>
                    <th className="px-6 py-4 text-white font-semibold">Interest Rate</th>
                    <th className="px-6 py-4 text-white font-semibold">Best For</th>
                    <th className="px-6 py-4 text-white font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">Term Loan</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      $25,000 - $1,000,000
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      1-5 years
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-medium">7.25% - 12.99%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      Expansion, equipment, working capital
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/business-loan/term" className="text-green-400 hover:text-green-300 font-medium text-sm">
                        Details
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">Line of Credit</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      $10,000 - $500,000
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      Revolving
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-medium">8.99% - 15.99%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      Seasonal needs, cash flow gaps
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/business-loan/line-of-credit" className="text-green-400 hover:text-green-300 font-medium text-sm">
                        Details
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">SBA Loan</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      $50,000 - $5,000,000
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      5-25 years
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-medium">5.50% - 8.25%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      Long-term growth, real estate, acquisition
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/business-loan/sba" className="text-green-400 hover:text-green-300 font-medium text-sm">
                        Details
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-green-900/20 text-sm text-gray-400">
              Rates shown are for qualified borrowers with strong credit profiles and may vary based on business history, cash flow, and industry. Last updated: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4"
            >
              Frequently Asked Questions
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Common Questions About <span className="text-green-400">Business Loans</span>
            </motion.h2>
          </div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto divide-y divide-gray-700 bg-gray-800 rounded-xl overflow-hidden"
          >
            {faqItems.map((item, index) => (
              <div key={index} className="group">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-white">
                    <h5 className="font-medium">{item.question}</h5>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" className="text-gray-400">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-300">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="/business-loan/faq"
              className="inline-flex items-center text-green-400 font-medium hover:text-green-300"
            >
              View all business loan FAQs <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-12 text-center shadow-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -mb-10 -ml-10"></div>
            
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Ready to Grow Your Business?
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Get Funding in as Little as 24 Hours
            </h2>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
              Apply in minutes, receive a decision today, and get funds deposited directly to your business account.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/loan-application" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Apply Now
              </Link>
              <Link href="tel:+1-(315)-949-8539" className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Speak With a Loan Specialist
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-white">
                <FiShield className="mr-2" />
                <span>Secure Application</span>
              </div>
              <div className="flex items-center text-white">
                <FiClock className="mr-2" />
                <span>Fast Decisions</span>
              </div>
              <div className="flex items-center text-white">
                <FiCheckCircle  className="mr-2" />
                <span>$2B+ Funded</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
