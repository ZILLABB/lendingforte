'use client';

import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

export default function AboutTeam() {
  const executives = [
    {
      name: 'James Davidson',
      role: 'Chief Executive Officer',
      bio: 'James founded LendingForte with a vision to transform the lending industry through technology and client-centered service.',
      initial: 'JD',
      image: '/images/lendingforte/about/team/executive-1.jpg'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Financial Officer',
      bio: 'With over 15 years in financial services, Sarah oversees our financial strategy and ensures sustainable growth.',
      initial: 'SC',
      image: '/images/lendingforte/about/team/executive-2.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'Michael leads our technology initiatives, focusing on creating secure, innovative platforms for our clients.',
      initial: 'MR',
      image: '/images/lendingforte/about/team/executive-3.jpg'
    },
    {
      name: 'Emily Washington',
      role: 'Chief Operating Officer',
      bio: 'Emily ensures our day-to-day operations run smoothly while maintaining our high standards of service excellence.',
      initial: 'EW',
      image: '/images/lendingforte/about/team/executive-4.jpg'
    }
  ];

  const directors = [
    {
      name: 'David Kim',
      role: 'Director of Personal Loans',
      initial: 'DK'
    },
    {
      name: 'Olivia Martinez',
      role: 'Director of Mortgage Services',
      initial: 'OM'
    },
    {
      name: 'Robert Johnson',
      role: 'Director of Business Financing',
      initial: 'RJ'
    },
    {
      name: 'Sophia Lee',
      role: 'Director of Client Experience',
      initial: 'SL'
    },
    {
      name: 'Thomas Wilson',
      role: 'Director of Risk Management',
      initial: 'TW'
    },
    {
      name: 'Natalie Garcia',
      role: 'Director of Marketing',
      initial: 'NG'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Meet Our Leadership Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Our experienced team of financial experts is dedicated to providing innovative solutions and exceptional service.
          </motion.p>
        </div>

        {/* Executive Team */}
        <h3 className="text-2xl font-semibold text-white mb-8 text-center">Executive Leadership</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {executives.map((executive, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-300 border border-dark-100/50 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={executive.image}
                  alt={`${executive.name}, ${executive.role} at LendingForte`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent"></div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-1">{executive.name}</h4>
                <p className="text-primary-400 text-sm mb-3">{executive.role}</p>
                <p className="text-gray-400 text-sm mb-4">{executive.bio}</p>

                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                    aria-label={`${executive.name}'s LinkedIn`}
                  >
                    <FaLinkedinIn size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                    aria-label={`${executive.name}'s Twitter`}
                  >
                    <FaTwitter size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directors */}
        <h3 className="text-2xl font-semibold text-white mb-8 text-center">Department Directors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((director, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-dark-300 border border-dark-100/50 rounded-lg p-4 flex items-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-semibold text-primary-500">{director.initial}</span>
              </div>
              <div className="ml-4">
                <h4 className="text-white font-medium">{director.name}</h4>
                <p className="text-sm text-gray-400">{director.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our team also includes over 50 dedicated professionals across customer service, loan processing, underwriting, technology, marketing, and administration, all working together to provide you with exceptional financial solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
