// import VideoThumb from '@/public/images/hero-image-01.jpg'
// import ModalVideo from '@/components/modal-video'

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Enhanced CSS-based background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.25),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-10 md:pt-40 md:pb-16">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100" 
              data-aos="fade-up"
            >
              Get Fast <span className="text-green-500">Cash.</span> Apply Now,
              Get <span className="text-green-500 font-extrabold">FUNDED</span> Today!
            </h1>
            
            <p
              className="text-xl text-gray-300 mb-10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Lending forte provides a fast, easy, and modern way of borrowing
              money with a line of credit that provides a solid financial
              foundation.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full bg-green-600 hover:bg-green-500 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  href="/loan-application"
                >
                  Apply Now
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <Link
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
                  href="/learn-more"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Financial dashboard visualization - matching your current design */}
        <div className="relative max-w-5xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="800">
          {/* Browser-like window */}
          <div className="relative h-80 sm:h-96 bg-gray-800/90 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            {/* Window controls */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
              <div className="h-5 w-64 bg-gray-700 rounded-md"></div>
            </div>
            
            {/* Dashboard content */}
            <div className="absolute top-12 left-4 right-4 bottom-4 grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="col-span-3 bg-gray-800/80 rounded-lg p-3">
                <div className="h-8 w-full bg-gray-700/70 rounded-md mb-4"></div>
                <div className="h-6 w-full bg-gray-700/50 rounded-md mb-3"></div>
                <div className="h-6 w-full bg-gray-700/50 rounded-md mb-3"></div>
                <div className="h-6 w-5/6 bg-gray-700/50 rounded-md mb-3"></div>
                <div className="h-6 w-2/3 bg-gray-700/50 rounded-md mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-700/50 rounded-md"></div>
              </div>
              
              {/* Main content */}
              <div className="col-span-9 grid grid-rows-2 gap-4">
                {/* Top row charts */}
                <div className="row-span-1 grid grid-cols-2 gap-4">
                  {/* Bar chart */}
                  <div className="bg-gray-800/80 rounded-lg p-3">
                    <div className="h-5 w-1/2 bg-gray-700/70 rounded-md mb-4"></div>
                    <div className="flex items-end justify-center h-28 pt-4">
                      <div className="w-1/6 h-1/4 bg-green-500/80 rounded-sm mx-1"></div>
                      <div className="w-1/6 h-2/5 bg-green-500/80 rounded-sm mx-1"></div>
                      <div className="w-1/6 h-1/2 bg-green-500/80 rounded-sm mx-1"></div>
                      <div className="w-1/6 h-3/4 bg-green-500/80 rounded-sm mx-1"></div>
                      <div className="w-1/6 h-full bg-green-500/80 rounded-sm mx-1"></div>
                      <div className="w-1/6 h-4/5 bg-green-500/80 rounded-sm mx-1"></div>
                    </div>
                  </div>
                  
                  {/* Circle chart */}
                  <div className="bg-gray-800/80 rounded-lg p-3">
                    <div className="h-5 w-1/2 bg-gray-700/70 rounded-md mb-4"></div>
                    <div className="flex items-center justify-center h-28">
                      <div className="w-28 h-28 rounded-full border-4 border-green-500/80 flex items-center justify-center">
                        <div className="text-green-500 text-2xl font-bold">75%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom row */}
                <div className="row-span-1 bg-gray-800/80 rounded-lg p-3">
                  <div className="h-5 w-1/3 bg-gray-700/70 rounded-md mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-700/40 p-3 rounded-lg">
                      <div className="h-4 w-1/2 bg-gray-600/60 rounded-md mb-3"></div>
                      <div className="h-10 w-full bg-green-600/50 rounded-md"></div>
                    </div>
                    <div className="bg-gray-700/40 p-3 rounded-lg">
                      <div className="h-4 w-1/2 bg-gray-600/60 rounded-md mb-3"></div>
                      <div className="h-10 w-full bg-blue-600/50 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature cards - styled to match your current design */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-6 px-4">
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-lg px-6 py-4 text-white text-center shadow-xl border border-gray-700/50">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-400 font-bold text-xl">24h</span>
              </div>
              <div className="text-sm text-gray-300">Funding</div>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-lg px-6 py-4 text-white text-center shadow-xl border border-gray-700/50">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                <span className="text-green-400 font-bold text-xl">Simple</span>
              </div>
              <div className="text-sm text-gray-300">Application</div>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-lg px-6 py-4 text-white text-center shadow-xl border border-gray-700/50">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-400 font-bold text-xl">Secure</span>
              </div>
              <div className="text-sm text-gray-300">Process</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved decorative shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white -mb-1 rounded-t-[50%]"></div>
    </section>
  );
}
