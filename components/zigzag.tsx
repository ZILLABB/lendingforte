'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import FeatImage01 from "@/public/images/lendingforte/pexels-pixabay-262028.jpg";
import FeatImage02 from "@/public/images/lendingforte/vecteezy_close-up-of-a-home-loan-application_1223438.jpg";
import FeatImage03 from "@/public/images/lendingforte/vecteezy_real-estate-agent-giving-money-to-home-buyer_1227232.jpg";

// Feature item type definition
type FeatureItem = {
  id: number;
  image: any;
  tagline: string;
  title: string;
  description: string;
  benefits: string[];
  imagePosition: "left" | "right";
};

// Reusable check icon component
const CheckIcon = () => (
  <svg
    className="w-4 h-4 fill-current text-emerald-400 mr-3 shrink-0"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
  </svg>
);

// Premium Feature content data
const featureItems: FeatureItem[] = [
  {
    id: 1,
    image: FeatImage01,
    tagline: "Premium Solutions. Strategic Savings.",
    title: "Elevate Your Financial Journey",
    description: "Experience our premium application process with transparent terms, expedited approvals, and personalized financial guidance tailored to your unique goals.",
    benefits: [
      "Streamlined application with dedicated concierge service",
      "Enhanced security protocols protecting your sensitive information",
      "Exclusive rates and terms available only to premium clients",
    ],
    imagePosition: "right",
  },
  {
    id: 2,
    image: FeatImage02,
    tagline: "Sophisticated Efficiency. Unmatched Value.",
    title: "Command Your Financial Future",
    description: "Our premium lending platform provides you with powerful tools and insights to make informed decisions with confidence and precision.",
    benefits: [
      "Advanced financial analytics dashboard for loan management",
      "Priority processing with our elite underwriting team",
      "Flexible terms designed for sophisticated financial strategies",
    ],
    imagePosition: "left",
  },
  {
    id: 3,
    image: FeatImage03,
    tagline: "Strategic Financing. Exceptional Results.",
    title: "Transform Aspirations Into Achievements",
    description: "Our premium financial solutions are engineered to help you capitalize on opportunities and navigate complex financial landscapes with confidence.",
    benefits: [
      "Customized loan structures aligned with your financial goals",
      "Dedicated relationship manager for ongoing financial guidance",
      "Exclusive access to financial planning resources and tools",
    ],
    imagePosition: "right",
  },
];

// Premium FeatureBlock component for a single zigzag item
const FeatureBlock = ({ item }: { item: FeatureItem }) => {
  const blockRef = useRef(null);
  const isInView = useInView(blockRef, { once: true, amount: 0.3 });

  const contentColumn = (
    <motion.div
      className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-6 lg:col-span-6 ${
        item.imagePosition === "right" ? "md:order-1" : "md:order-2"
      }`}
      initial={{ opacity: 0, x: item.imagePosition === "right" ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`${item.imagePosition === "right" ? "md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16"}`}>
        <div className="inline-block text-xl font-medium bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent mb-3 pb-1 border-b-2 border-emerald-300 dark:border-emerald-600">
          {item.tagline}
        </div>
        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white relative inline-block">
          {item.title}
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full"></span>
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {item.description}
        </p>
        <ul className="space-y-4">
          {item.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1 rounded-full mr-3">
                <CheckIcon />
              </div>
              <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  const imageColumn = (
    <motion.div
      className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-6 lg:col-span-6 mb-8 md:mb-0 ${
        item.imagePosition === "right" ? "md:order-2" : "md:order-1"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl group h-full border border-gray-200 dark:border-gray-700">
        {/* Premium image overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 z-10"></div>

        <Image
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          src={item.image}
          width={540}
          height={405}
          alt={item.title}
          priority={item.id === 1}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Premium hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

        {/* Premium corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/20 to-transparent z-10 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-transparent z-10 rounded-tr-[100px]"></div>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={blockRef}
      className="md:grid md:grid-cols-12 md:gap-12 items-center py-12 border-b border-gray-100 dark:border-gray-800 last:border-0"
    >
      {contentColumn}
      {imageColumn}
    </div>
  );
};

export default function Zigzag() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-12">
          {/* Premium Section header */}
          <motion.div
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-5 shadow-sm border border-emerald-200/50 dark:border-emerald-700/50"
            >
              Premium Financial Solutions
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Unlock <span className="relative inline-block">
                sophisticated solutions
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full"></span>
              </span> with our premium financial products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Experience the pinnacle of financial flexibility with our premium lending solutions,
              meticulously crafted to address your sophisticated financial needs. Whether you're
              financing a luxury renovation, consolidating high-value assets, or investing in your
              future, our premium products deliver exceptional value and unparalleled service.
            </motion.p>
          </motion.div>

          {/* Features */}
          <div className="space-y-16 md:space-y-0">
            {featureItems.map((item) => (
              <FeatureBlock key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
