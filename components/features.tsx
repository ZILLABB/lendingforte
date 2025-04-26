export default function Features() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-16 md:py-24">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400 rounded-full mb-4">Financial Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Get the <span className="text-green-600 dark:text-green-500 relative">
                funds
                <span className="absolute bottom-1 left-0 w-full h-2 bg-green-200 dark:bg-green-800 -z-10 opacity-50"></span>
              </span> you need, when you need them.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Access financial support on your terms. Whether covering unexpected expenses or 
              pursuing ambitions, our tailored loan options give you the flexibility you deserve.
            </p>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* 1st item */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Quick Online Application</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Apply from anywhere in minutes. Our intuitive process gets you started with minimal paperwork.
              </p>
            </div>

            {/* 2nd item */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Personalized Options</h4>
              <p className="text-gray-600 dark:text-gray-300">
                From personal to business loans, our diverse products adapt to your specific financial needs.
              </p>
            </div>

            {/* 3rd item */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Complete Transparency</h4>
              <p className="text-gray-600 dark:text-gray-300">
                No hidden fees or surprises. We clearly present all rates, terms, and costs upfront.
              </p>
            </div>

            {/* 4th item */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Bank-Level Security</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with advanced encryption and secure authentication protocols.
              </p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <a href="/loan-application" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              Apply Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
