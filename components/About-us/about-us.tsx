"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheck, FiShield, FiUsers, FiAward, FiClock } from "react-icons/fi";
import { HiOutlineLightBulb, HiOutlineScale, HiOutlineChartBar, HiOutlineUserGroup } from "react-icons/hi";

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const stats = [
    {
      label: "Years Experience",
      value: "10+",
      icon: <FiClock className="w-5 h-5" />,
      description: "Industry leadership since 2013"
    },
    {
      label: "Satisfied Clients",
      value: "25,000+",
      icon: <FiUsers className="w-5 h-5" />,
      description: "Across all 50 states"
    },
    {
      label: "Funding Provided",
      value: "$2.7B+",
      icon: <HiOutlineScale className="w-5 h-5" />,
      description: "In loans and credit facilities"
    },
    {
      label: "Client Retention",
      value: "94%",
      icon: <HiOutlineChartBar className="w-5 h-5" />,
      description: "Return client engagement rate"
    },
  ];

  const values = [
    {
      title: "Financial Inclusion",
      description: "We believe everyone deserves access to fair financial products. Our proprietary QuantumScore™ technology evaluates 100+ data points beyond traditional credit metrics, enabling us to approve 27% more applicants than traditional lenders.",
      icon: <HiOutlineScale className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Radical Transparency",
      description: "We've eliminated the fine print and hidden fees that plague traditional lending. Our TrueRate™ guarantee ensures the rate you're quoted is the rate you receive, with all terms clearly explained in plain language before you commit.",
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Data-Driven Expertise",
      description: "Our lending decisions combine advanced machine learning with human financial expertise. This hybrid approach allows us to see beyond numbers to understand your unique financial situation and offer truly personalized solutions.",
      icon: <FiUsers className="w-6 h-6" />,
      color: "from-teal-400 to-teal-600",
    },
    {
      title: "Continuous Innovation",
      description: "We invest 18% of our revenue in research and development—nearly triple the industry average. This commitment has produced breakthrough technologies like our 12-minute application process and same-day funding capabilities.",
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      color: "from-green-400 to-teal-600",
    },
  ];

  const timelineEvents = [
    {
      year: "2013",
      title: "Founded in San Francisco",
      description: "LendingForte was established by a team of financial and technology experts with a mission to transform lending through data science and customer-centric design."
    },
    {
      year: "2015",
      title: "Series A Funding",
      description: "Secured $12M in Series A funding led by Sequoia Capital to expand our proprietary underwriting technology and grow our lending capabilities."
    },
    {
      year: "2017",
      title: "Launched QuantumScore™ Technology",
      description: "Introduced our revolutionary credit assessment algorithm that analyzes 100+ data points beyond traditional credit scores, increasing approval rates by 32%."
    },
    {
      year: "2019",
      title: "Expanded to Business Lending",
      description: "Launched specialized business financing solutions with industry-specific underwriting models for 12 major business sectors."
    },
    {
      year: "2021",
      title: "Reached $1B in Loans",
      description: "Celebrated funding over $1 billion in loans while maintaining a loan performance rate exceeding industry standards by 28%."
    },
    {
      year: "2023",
      title: "Introduced Embedded Finance API",
      description: "Launched our API platform allowing partner businesses to offer LendingForte financing solutions directly within their customer experience."
    }
  ];

  const team = [
    {
      name: "David Rodriguez",
      position: "Chief Executive Officer",
      bio: "Former Managing Director at Goldman Sachs with 18+ years in financial services. MBA from Harvard Business School. David has led LendingForte to 300% growth over 5 years while maintaining industry-leading customer satisfaction metrics.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Emily Chen",
      position: "Chief Technology Officer",
      bio: "MIT Computer Science PhD and former Google AI Research Lead. Emily architected our proprietary underwriting algorithm that has increased approval rates by 27% while maintaining portfolio performance. Named to Forbes 30 Under 30 in Finance.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      name: "Marcus Johnson",
      position: "Chief Risk Officer",
      bio: "Previously Head of Credit Strategy at JP Morgan with 15+ years in risk management. Marcus holds a PhD in Financial Economics from Stanford and has published research on alternative credit scoring models that has been cited in Federal Reserve publications.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lendingforte/about-hero.jpg"
            alt="Lending Forte Team"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-10">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-6"
            >
              Our Story
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">LendingForte</span> Difference
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-300 mb-4"
            >
              Since 2013, we've been transforming the lending industry through our commitment to financial
              inclusion, technological innovation, and personalized service excellence.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-gray-400 mb-8"
            >
              Our team of financial experts and technology innovators work together to create lending solutions
              that empower individuals and businesses to achieve their financial goals.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-green-900/5 transition-all group hover:-translate-y-1 duration-300"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-green-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-xl font-medium text-white mb-2">
                  {stat.label}
                </p>
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section - Our Story */}
      <section className="py-20 bg-black/60">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl relative h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop"
                alt="Professional financial planning and lending consultation"
                fill
                objectFit="cover"
                className="transition-transform hover:scale-105 duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
                Who We Are
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-green-400">Story</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed text-lg">
                At <span className="text-green-400 font-semibold">LendingForte</span>,
                we've built our reputation on three foundational pillars: financial inclusion, technological innovation,
                and personalized expertise. Our proprietary underwriting models look beyond traditional credit metrics
                to evaluate the complete financial picture of each applicant.
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed text-lg">
                Founded by a team of financial technology experts with backgrounds from leading institutions including
                Goldman Sachs, JP Morgan, and Silicon Valley startups, we've combined decades of financial expertise
                with cutting-edge technology to revolutionize the lending experience.
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed text-lg">
                Our approach has earned recognition from industry leaders, with LendingForte being named
                "Most Innovative Lender" by FinTech Breakthrough Awards and receiving a 4.9/5 customer
                satisfaction rating across major review platforms. We're proud that 78% of our business comes
                from repeat clients and referrals.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full transition-colors shadow-lg group"
                >
                  Get to know our team
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The <span className="text-green-400">Lending Forte</span> Timeline
            </h2>
            <p className="text-gray-300 text-lg">
              Track our growth from a small startup to an industry leader in financial technology and lending.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-900/30 hidden md:block"></div>

              {/* Timeline events */}
              <div className="space-y-16">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 z-10">
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                        <span className="text-sm"></span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
                        <span className="inline-block px-3 py-1 bg-green-900/30 text-green-400 text-sm font-medium rounded-md mb-3">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-gray-300">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Our Foundation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core <span className="text-green-400">Values</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have with our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${value.color}`}></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-900/30 text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Our Leaders
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet The <span className="text-green-400">Team</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The experts behind our mission to transform lending for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-green-400 font-medium">{member.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300">{member.bio}</p>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <Link href="#" className="text-green-400 hover:text-green-300 inline-flex items-center font-medium">
                      Connect <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              Recognition
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Awards & <span className="text-green-400">Accolades</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our commitment to excellence has been recognized across the industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 text-center border border-gray-700"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-900/30 rounded-full">
                  <FiAward className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">
                  {["Top Lender", "Innovation Award", "Customer Satisfaction", "Financial Inclusion"][index]}
                </h3>
                <p className="text-gray-400 text-sm">
                  {["Financial Times", "Fintech Innovation", "Consumer Choice", "Inclusive Finance"][index]}
                </p>
                <p className="text-green-400 font-medium mt-2">
                  {["2023", "2022", "2021", "2020"][index]}
                </p>
              </motion.div>
            ))}
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
            className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-12 text-center shadow-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -mb-10 -ml-10"></div>

            <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Join Our Journey
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to Experience the Difference?
            </h2>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
              Join thousands of satisfied customers who have trusted Lending Forte with their financial needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Apply for a Loan
              </Link>
              <Link href="/contact" className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors shadow-md hover:shadow-lg relative z-10">
                Contact Our Team
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-white">
                <FiShield className="mr-2" />
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center text-white">
                <FiCheck className="mr-2" />
                <span>Fast Approval Process</span>
              </div>
              <div className="flex items-center text-white">
                <FiUsers className="mr-2" />
                <span>5,000+ Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
