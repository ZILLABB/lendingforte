// import VideoThumb from '@/public/images/hero-image-01.jpg'
// import ModalVideo from '@/components/modal-video'

import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Get Fast <span className="text-green-600">Cash.</span> Apply Now,
              Get <span className="text-green-600">FUNDED</span> Today!
            </h1>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Lending forte provides a fast, easy, and modern way of borrowing
              money with a line of credit that provides a solid financial
              foundation.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link 
                  className="btn text-white rounded-full bg-green-600 hover:bg-gray-300 hover:text-gray-800 w-full mb-4 sm:w-auto sm:mb-0"
                  href="/loan-application"
                >
                  Apply Now
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a
                  className="btn text-white rounded-full bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                  href="#0"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <img
            className="w-full h-full rounded-lg "
            src="../images/lendingforte/pexels-pixabay-210600.jpg"
            alt="coins"
          />
        </div>
      </div>
    </section>
  );
}
