"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiStar, FiShield, FiTrendingUp, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";
import { HiOutlineLightningBolt, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineCash } from "react-icons/hi";
// import PersonalLoanCalculator from "./personal-loan-calculator";

export default function PersonalLoanPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
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

  const personalLoanTypes = [
    {
      title: "Debt Consolidation",
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      description: "Consolidate high-interest debt into one fixed-rate loan, potentially saving thousands in interest and simplifying your financial life with a single monthly payment.",
      benefits: ["Average interest savings of $3,500", "Reduce multiple payments to just one", "Potential credit score improvement"]
    },
    {
      title: "Home Improvement",
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      description: "Transform your living space with a home improvement loan that doesn't require equity, collateral, or lengthy approval processes like traditional home equity loans.",
      benefits: ["No home equity required", "Fixed rates from 6.99% APR", "Funding in as little as 48 hours"]
    },
    {
      title: "Major Purchases",
      icon: <HiOutlineCash className="w-6 h-6" />,
      description: "Finance significant expenses like appliances, furniture, medical procedures, or special events with predictable payments and rates typically lower than credit cards.",
      benefits: ["Rates 50-70% lower than credit cards", "Flexible terms from 12-60 months", "No prepayment penalties or hidden fees"]
    },
    {
      title: "Emergency Expenses",
      icon: <HiOutlineLightningBolt className="w-6 h-6" />,
      description: "Access funds quickly for unexpected costs with our expedited application process designed specifically for time-sensitive financial needs.",
      benefits: ["Same-day application decisions", "Funds as soon as next business day", "Minimal documentation required"]
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Debt Consolidation",
      quote: "I consolidated $27,500 across five credit cards into one affordable monthly payment. My interest rate dropped from 22% to just 9.5%, saving me $8,430 over the loan term and improving my credit score by 76 points in six months.",
      image: "/images/testimonials/person1.jpg",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Home Renovation",
      quote: "LendingForte's $35,000 personal loan helped us complete our kitchen remodel without tapping into our home equity. We were approved in 6 hours and funded in 2 days—significantly faster than the 3-4 weeks quoted by our bank.",
      image: "/images/testimonials/person2.jpg",
      stars: 5,
    },
    {
      name: "Jessica Williams",
      role: "Wedding Expenses",
      quote: "Our $18,500 wedding loan came with a fixed 7.25% APR compared to the 19.99% our credit cards would have charged. The predictable payment schedule made budgeting simple, and we'll save approximately $4,200 in interest.",
      image: "/images/testimonials/person3.jpg",
      stars: 5,
    },
  ];

  const faqItems = [
    {
      question: "What credit score do I need for a personal loan?",
      answer: "While traditional lenders typically require scores of 700+, our proprietary underwriting model considers multiple factors beyond credit score. We regularly approve qualified borrowers with scores as low as 620, and our Credit Builder program can help those with scores from 580-619 establish positive payment history."
    },
    {
      question: "How quickly can I receive funds after approval?",
      answer: "Our digital process enables 90% of approved applicants to receive funds within 1 business day after final approval. With our ExpressFund™ option, funds can be deposited within 4 hours of final approval for an additional $25 fee, which is waived for loans over $10,000."
    },
    {
      question: "Are there any fees associated with personal loans?",
      answer: "Unlike many lenders who charge origination fees of 1-8%, LendingForte personal loans have zero origination fees, no application fees, and no prepayment penalties. The only potential fees are a late payment fee (5% of payment amount) and an optional ExpressFund™ fee ($25) for same-day funding."
    },
    {
      question: "How does LendingForte compare to other lenders?",
      answer: "Our rates average 3.2% lower than traditional banks for similar credit profiles. We approve 27% more applicants than traditional lenders through our comprehensive evaluation process, and our digital application takes an average of 12 minutes to complete versus the industry average of 37 minutes."
    },
    {
      question: "Can I use a personal loan for any purpose?",
      answer: "Yes, LendingForte personal loans can be used for virtually any legitimate purpose including debt consolidation, home improvements, major purchases, medical expenses, education costs, moving expenses, and more. The only restrictions are for post-secondary education tuition, illegal activities, or speculative investments."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/10 -z-10"></div>
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-green-200 dark:bg-green-800/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-green-200 dark:bg-green-800/20 rounded-full filter blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-6">
                Financial Freedom Starts Here
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 inline-block text-transparent bg-clip-text">Personal Loans</span> Tailored to Your Financial Journey
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-xl">
                Access $1,000 to $50,000 with competitive fixed rates starting at 5.99% APR and terms from 12-60 months. Our proprietary underwriting considers your complete financial profile, not just your credit score.
              </p>

              <p className="text-md text-gray-500 dark:text-gray-400 mb-8 max-w-xl">
                Get pre-qualified in under 2 minutes with no impact to your credit score and receive funds as soon as the next business day after approval.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact-us" className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                  Contact Us <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Free Consultation</span>
                </Link>

                <Link href="/loan-calculator" className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-medium py-3 px-8 rounded-full border border-green-100 dark:border-green-800 hover:bg-green-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-md">
                  Calculate Payment <FiArrowRight className="ml-2" />
                </Link>
              </div>

              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
                      <Image
                        src={`/images/testimonials/person${num}.jpg`}
                        alt="Customer"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-green-600 dark:text-green-400">4.8/5</span>
                  <span className="text-gray-500 dark:text-gray-400"> from 2,000+ reviews</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-5/12"
            >
              <div id="calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-green-600 dark:bg-green-700 p-6 text-white">
                  <h3 className="text-xl font-bold">Personal Loan Calculator</h3>
                  <p className="text-green-100 dark:text-green-200 text-sm">Estimate your monthly payments and total cost</p>
                </div>
                {/* <PersonalLoanCalculator /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4"
            >
              Why Choose Us
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Personal Loans Designed Around <span className="text-green-600 dark:text-green-400">You</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Experience a borrowing experience that puts your financial well-being first.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiClock className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Intelligent Approvals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our proprietary algorithm evaluates 100+ data points beyond credit score, resulting in 27% more approvals than traditional lenders with decisions in as little as 4 hours.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiDollarSign className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Market-Leading Rates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fixed rates from 5.99%-15.49% APR with autopay discount, averaging 3.2% lower than traditional bank personal loans for qualified borrowers.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiFileText className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Streamlined Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                100% digital process with secure document upload and e-signature. 83% of customers complete their application in under 12 minutes.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiShield className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Total Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Zero origination fees, no prepayment penalties, and no application fees. We've saved customers an average of $643 in fees compared to other lenders.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4"
            >
              Versatile Financing
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Personal Loans for Every <span className="text-green-600 dark:text-green-400">Purpose</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Whether you're consolidating debt or funding a major purchase, we have options tailored to your needs.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {personalLoanTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex flex-col h-full"
              >
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 text-green-600">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {type.description}
                  </p>

                  <div className="space-y-3">
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center">
                        <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto p-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link href="/contact-us" className="text-green-600 dark:text-green-400 font-medium flex items-center hover:text-green-700 dark:hover:text-green-300 transition-colors">
                    Contact Us <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rate Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4"
            >
              Compare and Save
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              How We <span className="text-green-600 dark:text-green-400">Compare</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              See how our personal loan rates compare to other financing options.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">Loan Type</th>
                    <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">Starting APR</th>
                    <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">Est. Monthly Payment</th>
                    <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">Typical Fees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">Our Personal Loan</td>
                    <td className="py-4 px-6 text-center text-green-600 dark:text-green-400 font-bold">5.99%</td>
                    <td className="py-4 px-6 text-center">$216/month*</td>
                    <td className="py-4 px-6 text-center">None</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">Credit Cards</td>
                    <td className="py-4 px-6 text-center">18.99%</td>
                    <td className="py-4 px-6 text-center">$254/month*</td>
                    <td className="py-4 px-6 text-center">Annual fee, late fees</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">Home Equity Loan</td>
                    <td className="py-4 px-6 text-center">7.59%</td>
                    <td className="py-4 px-6 text-center">$224/month*</td>
                    <td className="py-4 px-6 text-center">Closing costs, appraisal</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">401k Loan</td>
                    <td className="py-4 px-6 text-center">8.25%</td>
                    <td className="py-4 px-6 text-center">$230/month*</td>
                    <td className="py-4 px-6 text-center">Lost investment returns</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
              *Estimated monthly payment based on $10,000 loan with 60-month term. Rates as of [current date]. Your rate may differ based on creditworthiness, loan amount, and term.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4"
            >
              Customer Stories
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Real People, Real <span className="text-green-600 dark:text-green-400">Results</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Hear from customers who transformed their finances with our personal loans.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-green-600 dark:text-green-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
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
              className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4"
            >
              Common Questions
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Frequently Asked <span className="text-green-600 dark:text-green-400">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Everything you need to know about our personal loan options.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-gray-800 dark:text-white">{item.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" className="text-gray-400 dark:text-gray-500">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300"
            >
              View all FAQs <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 to-teal-600 dark:from-green-500 dark:to-teal-700 rounded-2xl p-12 text-center shadow-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -mb-10 -ml-10"></div>

            <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Get Started Today
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
              Check your rate in 2 minutes with no impact to your credit score. Get funds as soon as tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Contact Us
              </Link>
              <Link href="tel:+1-(315)-949-8539" className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Speak With a Specialist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

