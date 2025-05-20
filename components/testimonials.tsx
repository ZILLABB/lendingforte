'use client'
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// Testimonial data structure for better maintainability
const testimonials = [
  {
    id: 1,
    content: "LendingForte helped me secure a $250,000 business expansion loan with a 5.75% rate when traditional banks were offering 8%+. Their streamlined process saved me weeks of paperwork and their financial advisor provided invaluable guidance on optimizing my business cash flow.",
    name: "Sarah Mitchell",
    role: "Tech Startup Founder",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "After being declined by two major banks, LendingForte approved my $425,000 commercial property loan within 72 hours. Their underwriting team actually took time to understand my investment strategy and structured terms that aligned perfectly with my cash flow projections.",
    name: "James Wilson",
    role: "Real Estate Developer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "LendingForte's debt consolidation solution saved me $387 monthly by combining five high-interest loans into one manageable payment. Their financial wellness tools helped me create a realistic budget and improve my credit score by 68 points in just six months.",
    name: "Priya Patel",
    role: "Healthcare Professional",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 4,
    content: "As a financial advisor myself, I scrutinized LendingForte's mortgage refinance offer thoroughly. Their 3.85% fixed rate saved me $62,000 over the loan term compared to my previous lender. Their transparent fee structure and absence of prepayment penalties were refreshing in today's lending market.",
    name: "Michael Chang",
    role: "Investment Advisor",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
];

// Premium Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex mb-4 items-center">
      <div className="flex mr-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating
              ? 'text-transparent fill-current'
              : 'text-gray-600'}`}
            style={i < rating ? {
              fill: 'url(#star-gradient)'
            } : {}}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="text-sm text-gray-400 font-medium">
        <span className="text-green-500">{rating}.0</span>/5.0
      </div>
    </div>
  );
};

// Premium Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }: { testimonial: typeof testimonials[0], isActive: boolean }) => {
  // Function to safely render text with highlighted company name
  const renderContent = () => {
    const parts = testimonial.content.split(/LendingForte/g);
    const result = [];

    for (let i = 0; i < parts.length; i++) {
      // Add the text part
      result.push(<span key={`part-${i}`}>{parts[i]}</span>);

      // Add the company name (except after the last part)
      if (i < parts.length - 1) {
        result.push(
          <span key={`company-${i}`} className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 font-medium not-italic">
            LendingForte
          </span>
        );
      }
    }

    return result;
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
      } bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(8,_112,_84,_0.2)] overflow-hidden border border-gray-700/50`}
    >
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

      <div className="p-8 relative z-10">
        <div className="flex items-center mb-8">
          <div className="relative mr-4">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full blur-sm opacity-50 animate-pulse"></div>
            <Image
              className="w-14 h-14 rounded-full object-cover border-2 border-green-500 relative z-10 shadow-lg"
              src={testimonial.image}
              width={56}
              height={56}
              alt={`${testimonial.name}'s profile picture`}
            />
            <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full p-1 z-20 shadow-md">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
          </div>

          {/* Verified badge */}
          <div className="ml-auto bg-gray-800/80 rounded-full px-3 py-1 flex items-center shadow-inner">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-xs text-gray-300">Verified</span>
          </div>
        </div>

        <StarRating rating={testimonial.rating} />

        <blockquote className="text-gray-300 italic relative pl-6 border-l-2 border-gradient-to-b from-green-500 to-green-400">
          <svg className="absolute top-0 left-0 -ml-3 text-green-500 w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 24 20">
            <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
          </svg>
          <p className="mb-3 leading-relaxed">{renderContent()}</p>
        </blockquote>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate testimonials
  const goToNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setProgress(0); // Reset progress when changing testimonial
  }, []);

  // Auto-rotate with progress tracking
  useEffect(() => {
    // Immediately start auto-play
    if (isAutoPlaying) {
      // Clear any existing intervals
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);

      // Reset and start progress animation
      setProgress(0);
      const progressInterval = 50; // Update progress every 50ms
      const totalDuration = 4000; // 4 seconds per testimonial
      const progressStep = 100 / (totalDuration / progressInterval);

      progressRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + progressStep;
        });
      }, progressInterval);

      // Schedule next testimonial change
      autoPlayRef.current = setTimeout(goToNext, totalDuration);
    }

    // Cleanup function
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlaying, activeIndex, goToNext]);

  // Function to handle manual navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);

    // Reset timers when manually navigating
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    // Restart auto rotation if enabled
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(goToNext, 4000);
    }
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Animated floating elements */}
      {mounted && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-12 md:py-20">
          {/* Premium Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            {mounted && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 text-sm font-semibold text-green-400 bg-green-900/40 rounded-full mb-4 shadow-sm"
              >
                Premium Client Experiences
              </motion.span>
            )}

            {mounted && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Exceptional <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">Financial Outcomes</span>
              </motion.h2>
            )}

            <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-green-400 mx-auto mb-8 rounded-full"></div>

            {mounted && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                These testimonials showcase verified results from clients who partnered with LendingForte.
                Discover how our premium financial solutions delivered measurable value and substantial savings.
              </motion.p>
            )}
          </div>

          {/* Premium Testimonial carousel */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Premium Progress bar */}
              {isAutoPlaying && (
                <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gray-800/60 backdrop-blur-sm rounded-t-xl overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-50 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className="relative h-[420px] overflow-hidden rounded-xl">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === activeIndex ? 'opacity-100 z-10 translate-x-0' :
                      index < activeIndex ? 'opacity-0 z-0 -translate-x-full' : 'opacity-0 z-0 translate-x-full'
                    }`}
                  >
                    <TestimonialCard testimonial={testimonial} isActive={index === activeIndex} />
                  </div>
                ))}
              </div>

              {/* Premium Navigation controls */}
              <div className="flex justify-between items-center mt-10">
                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-gradient-to-r from-green-500 to-green-400 scale-125 shadow-md shadow-green-500/20'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length)}
                    className="p-2.5 rounded-full bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 shadow-lg"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
                    className="p-2.5 rounded-full bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 shadow-lg"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Premium testimonial counter */}
              <div className="absolute top-2 right-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-300 font-medium z-20">
                {activeIndex + 1} / {testimonials.length}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
