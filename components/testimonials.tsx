'use client'
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

// Testimonial data structure for better maintainability
const testimonials = [
  {
    id: 1,
    content: "This was a game-changer for me. The entire process was seamless, and I got the funds I needed without any hassle. Their team was supportive every step of the way.",
    name: "Sarah Mitchell",
    role: "Tech Startup Founder",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "Applying for a loan with LendingForte was a breeze. Their transparent approach and excellent customer service made the experience stress-free. I highly recommend them!",
    name: "James Wilson",
    role: "Real Estate Developer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "LendingForte went above and beyond to meet my borrowing needs. Their dedication and efficiency are truly commendable. Thanks to them, I achieved my financial goals with ease.",
    name: "Priya Patel",
    role: "Business Consultant",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 4,
    content: "I was skeptical at first, but LendingForte exceeded all my expectations. The approval process was quick, and their rates were competitive. Couldn't be happier!",
    name: "Michael Chang",
    role: "Investment Advisor",
    rating: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Testimonial Card Component
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
          <span key={`company-${i}`} className="text-green-400 font-medium not-italic">
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
      } bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden`}
    >
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <Image 
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
              src={testimonial.image}
              width={48}
              height={48}
              alt={`${testimonial.name}'s profile picture`}
            />
            <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-white">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
          </div>
        </div>
        
        <StarRating rating={testimonial.rating} />
        
        <blockquote className="text-gray-300 italic relative pl-6 border-l-2 border-green-500">
          <svg className="absolute top-0 left-0 -ml-3 text-green-500 w-6 h-6 opacity-50" fill="currentColor" viewBox="0 0 24 20">
            <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
          </svg>
          <p className="mb-3">{renderContent()}</p>
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

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Real stories from real clients who've experienced the LendingForte difference.
              Discover how we've helped businesses and individuals achieve their financial goals.
            </p>
          </div>

          {/* Testimonial carousel */}
          <div 
            className="max-w-3xl mx-auto relative" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Progress bar */}
            {isAutoPlaying && (
              <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-gray-800 rounded-t-xl overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-50 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            
            <div className="relative h-[400px] overflow-hidden rounded-xl">
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
            
            {/* Navigation controls */}
            <div className="flex justify-between mt-10">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'
                    } transition-colors duration-300`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
