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

// Feature content data
const featureItems: FeatureItem[] = [
  {
    id: 1,
    image: FeatImage01,
    tagline: "Swift solutions. Smart savings.",
    title: "Keep your loan process on track",
    description: "Experience a hassle-free application journey with transparent terms and quick approvals.",
    benefits: [
      "Streamline your borrowing journey",
      "Enjoy peace of mind with secure transactions",
      "Receive personalized support from our dedicated team",
    ],
    imagePosition: "right",
  },
  {
    id: 2,
    image: FeatImage02,
    tagline: "Efficiency meets affordability.",
    title: "Stay in control of your loan journey",
    description: "Embark on a seamless application process with clear terms and rapid approvals.",
    benefits: [
      "Simplify your borrowing experience",
      "Rest assured with secure transactions",
      "Get personalized assistance from our committed team",
    ],
    imagePosition: "left",
  },
  {
    id: 3,
    image: FeatImage03,
    tagline: "Empower your financial journey with smart choices.",
    title: "Stay on track with your loan aspirations",
    description: "Experience a seamless application process with transparent terms and expedited approvals.",
    benefits: [
      "Trust in secure transactions",
      "Optimize your borrowing experience",
      "Access personalized guidance from our dedicated team",
    ],
    imagePosition: "right",
  },
];

// FeatureBlock component for a single zigzag item
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
        <div className="inline-block text-xl font-medium text-emerald-500 mb-3 border-b-2 border-emerald-300 pb-1">
          {item.tagline}
        </div>
        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {item.description}
        </p>
        <ul className="space-y-3">
          {item.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon />
              <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
            </li>
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
      <div className="relative overflow-hidden rounded-xl shadow-xl group h-full">
        <Image
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          src={item.image}
          width={540}
          height={405}
          alt={item.title}
          priority={item.id === 1}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12">
          {/* Section header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-5">
              Reach goals that matter
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Unlock limitless solutions with our versatile loan product
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover the power of flexibility with our singular loan product,
              tailored to meet your diverse financial needs. Whether it's for a
              home renovation, debt consolidation, or pursuing your dreams, our
              solution offers unlimited possibilities.
            </p>
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
