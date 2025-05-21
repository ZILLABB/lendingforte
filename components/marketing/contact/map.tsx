'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactMap() {
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
            Visit Our Office
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Our headquarters is located in the heart of New York's Financial District.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden shadow-xl border border-dark-100/50 h-[400px] md:h-[500px]"
        >
          {/* Map image with overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/lendingforte/contact/map.jpg"
              alt="Map showing LendingForte office locations"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-dark-300/40 backdrop-blur-[2px]"></div>

            {/* New York location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-primary-500 animate-pulse"></div>
                <div className="absolute -inset-2 rounded-full border-2 border-primary-500/50 animate-ping"></div>
              </div>
              <div className="mt-2 bg-dark-200/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-center">
                <p className="text-white text-sm font-medium">New York HQ</p>
              </div>
            </div>

            {/* San Francisco location marker */}
            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-primary-400"></div>
                <div className="absolute -inset-1 rounded-full border-2 border-primary-400/50"></div>
              </div>
            </div>

            {/* Chicago location marker */}
            <div className="absolute top-2/5 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-primary-400"></div>
                <div className="absolute -inset-1 rounded-full border-2 border-primary-400/50"></div>
              </div>
            </div>

            {/* View on Google Maps button */}
            <div className="absolute bottom-4 right-4">
              <a
                href="https://www.google.com/maps/place/New+York,+NY+10004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Headquarters</h3>
            <p className="text-gray-300 mb-1">123 Financial District</p>
            <p className="text-gray-300 mb-3">New York, NY 10004</p>
            <p className="text-gray-400 text-sm">Our main office houses our executive team and primary operations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">West Coast Office</h3>
            <p className="text-gray-300 mb-1">456 Tech Avenue</p>
            <p className="text-gray-300 mb-3">San Francisco, CA 94105</p>
            <p className="text-gray-400 text-sm">Our West Coast branch focuses on technology and innovation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Midwest Branch</h3>
            <p className="text-gray-300 mb-1">789 Central Parkway</p>
            <p className="text-gray-300 mb-3">Chicago, IL 60601</p>
            <p className="text-gray-400 text-sm">Our Midwest office serves clients throughout the central United States.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Prefer to meet virtually? <a href="#schedule" className="text-primary-400 hover:text-primary-300">Schedule a video consultation</a> with one of our financial advisors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
