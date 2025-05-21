'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
      content: 'LendingForte made my home buying experience incredibly smooth. Their mortgage team guided me through every step, and I got a rate better than I expected. I couldn\'t be happier with my new home!',
      rating: 5,
      bgColor: 'from-primary-500/10 to-primary-600/5',
      initials: 'SJ',
      initialsColor: 'text-primary-500'
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      content: 'As a small business owner, I needed financing to expand my operations. LendingForte provided a tailored business loan solution that perfectly fit my needs. Their team truly understands the challenges entrepreneurs face.',
      rating: 5,
      bgColor: 'from-blue-500/10 to-blue-600/5',
      initials: 'MC',
      initialsColor: 'text-blue-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Graduate Student',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
      content: 'I was struggling with high-interest debt from my education. LendingForte helped me consolidate everything into one affordable personal loan with a much lower rate. Their online application was simple and fast!',
      rating: 4,
      bgColor: 'from-purple-500/10 to-purple-600/5',
      initials: 'ER',
      initialsColor: 'text-purple-500'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    let interval;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

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
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Hear from our satisfied customers about their experience with LendingForte.
          </motion.p>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  x: currentIndex === index ? 0 : (currentIndex > index ? -100 : 100)
                }}
                transition={{ duration: 0.5 }}
                className={`${
                  currentIndex === index ? 'block' : 'hidden'
                } bg-dark-200/80 backdrop-blur-sm border border-dark-100/50 rounded-xl p-8 shadow-xl relative overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/5 to-primary-600/0 rounded-full -mr-20 -mt-20 z-0"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/5 to-blue-600/0 rounded-full -ml-20 -mb-20 z-0"></div>

                {/* Quote marks */}
                <div className="absolute top-6 left-6 text-6xl text-primary-500/10 font-serif z-0">"</div>
                <div className="absolute bottom-6 right-6 text-6xl text-primary-500/10 font-serif z-0">"</div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary-500/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 96px"
                        unoptimized={testimonial.image.startsWith('http')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 opacity-60"></div>
                      <div className="absolute inset-0 bg-dark-300 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 italic mb-6 relative z-10 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="relative z-10">
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm flex items-center">
                        <span className="inline-block w-4 h-0.5 bg-primary-500/50 mr-2"></span>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-primary-500 shadow-md shadow-primary-500/20'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <motion.button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
              whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-300/80 backdrop-blur-sm border border-dark-100/50 flex items-center justify-center text-white transition-all duration-300 shadow-lg"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
              whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-300/80 backdrop-blur-sm border border-dark-100/50 flex items-center justify-center text-white transition-all duration-300 shadow-lg"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
