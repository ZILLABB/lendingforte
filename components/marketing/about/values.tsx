'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ShieldCheckIcon,
  LightBulbIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

export default function AboutValues() {
  const values = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our interactions, ensuring trust and reliability in every transaction.'
    },
    {
      icon: <LightBulbIcon className="w-6 h-6" />,
      title: 'Innovation',
      description: 'We continuously seek new ways to improve our services and create solutions that address evolving financial needs.'
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Client Focus',
      description: 'We put our clients at the center of everything we do, tailoring our solutions to meet their unique financial goals.'
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      title: 'Sustainability',
      description: 'We are committed to responsible lending practices that contribute to long-term financial health and environmental sustainability.'
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: 'Empathy',
      description: 'We understand the financial challenges people face and approach each situation with compassion and understanding.'
    },
    {
      icon: <ScaleIcon className="w-6 h-6" />,
      title: 'Fairness',
      description: 'We believe in equal access to financial opportunities and transparent terms that benefit all parties involved.'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/lendingforte/about/about-values.jpg"
          alt="LendingForte values background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark-300/90"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            These principles guide our decisions, shape our culture, and define how we serve our clients every day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-200 border border-dark-100/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 p-8 bg-dark-200 border border-dark-100/50 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          <blockquote className="text-xl text-gray-300 italic">
            "Our values aren't just words on a wall—they're the foundation of every interaction, every decision, and every loan we provide. They reflect our commitment to not just being a lender, but a trusted financial partner."
          </blockquote>
          <div className="mt-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
              <span className="text-lg font-semibold">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">James Davidson</p>
              <p className="text-sm text-gray-400">CEO & Founder, LendingForte</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
