'use client';

import { motion } from 'framer-motion';

export default function AboutTimeline() {
  const milestones = [
    {
      year: '2018',
      title: 'Foundation',
      description: 'LendingForte was founded with a mission to transform the lending industry through technology and client-centered service.'
    },
    {
      year: '2019',
      title: 'First 1,000 Clients',
      description: 'We reached our first major milestone of serving 1,000 clients with personal loans and mortgage solutions.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our fully digital application process, allowing clients to apply for loans from anywhere, anytime.'
    },
    {
      year: '2021',
      title: 'Business Financing',
      description: 'Expanded our services to include comprehensive business financing solutions for small and medium enterprises.'
    },
    {
      year: '2022',
      title: 'National Expansion',
      description: 'Grew our operations to serve clients nationwide, with a focus on underserved communities.'
    },
    {
      year: '2023',
      title: 'Sustainability Initiative',
      description: 'Launched our green financing program to support environmentally sustainable projects and businesses.'
    },
    {
      year: '2024',
      title: 'Innovation Award',
      description: 'Recognized with the Financial Innovation Award for our client-centered approach and technological advancements.'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            From our founding to today, we've been committed to innovation and excellence in financial services.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500/80 via-primary-500/50 to-primary-500/20"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-dark-300 z-10"></div>
                
                {/* Content */}
                <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                  <div className={`bg-dark-200 border border-dark-100/50 rounded-xl p-6 shadow-md ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 font-semibold">
                        {milestone.year}
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Future indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative mt-12 text-center"
          >
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary-500 animate-pulse"></div>
            </div>
            <div className="pt-12">
              <p className="text-white font-semibold">The Future</p>
              <p className="text-gray-400 max-w-md mx-auto">
                We continue to innovate and expand our services, always with our clients' financial success at the center of everything we do.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
