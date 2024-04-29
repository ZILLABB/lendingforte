export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">
              Get the <span className="text-green-600">funds</span> you need,
              when you need them.
            </h2>
            <p className="text-xl text-gray-400">
              Access the funds you require, precisely when you need them. From
              covering unexpected costs to pursuing your ambitions, our range of
              loan options is tailored to provide the financial assistance you
              seek. Start your application today and take control of your
              financial future effortlessly
            </p>
          </div>

          {/* Items */}
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {/* 1st item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="fill-current text-green-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <path
                  className="stroke-current text-green-100"
                  d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924"
                  strokeLinecap="square"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
                <path
                  className="stroke-current text-green-300"
                  d="M43 42h-9M43 37h-9"
                  strokeLinecap="square"
                  strokeWidth="2"
                />
              </svg>
              <h4 className="h4 mb-2">Online Application</h4>
              <p className="text-lg text-gray-400 text-center">
                Apply for a loan from the comfort of your own home with our
                intuitive online application process. Simply fill out the form,
                submit your documents, and get started on your financial
                journey.
              </p>
            </div>

            {/* 2nd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="fill-current text-green-600"
                  cx="32"
                  cy="32"
                  r="32"
                />
                <path
                  className="stroke-current text-green-100"
                  strokeWidth="2"
                  strokeLinecap="square"
                  d="M21 23h22v18H21z"
                  fill="none"
                  fillRule="evenodd"
                />
                <path
                  className="stroke-current text-green-300"
                  d="M26 28h12M26 32h12M26 36h5"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              <h4 className="h4 mb-2">Loan Products</h4>
              <p className="text-lg text-gray-400 text-center">
                {" "}
                Explore our diverse range of loan products designed to meet your
                specific needs, whether you're looking for a personal loan,
                business loan, auto loan, or mortgage.
              </p>
            </div>

            {/* 3rd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="fill-current text-green-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <g
                  transform="translate(21 21)"
                  strokeLinecap="square"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                >
                  <ellipse
                    className="stroke-current text-green-300"
                    cx="11"
                    cy="11"
                    rx="5.5"
                    ry="11"
                  />
                  <path
                    className="stroke-current text-green-100"
                    d="M11 0v22M0 11h22"
                  />
                  <circle
                    className="stroke-current text-green-100"
                    cx="11"
                    cy="11"
                    r="11"
                  />
                </g>
              </svg>
              <h4 className="h4 mb-2">Transparent Rates and Terms</h4>
              <p className="text-lg text-gray-400 text-center">
                We believe in transparency. Easily access information about
                interest rates, fees, and repayment terms for each loan product
                so you can make informed decisions about your finances.
              </p>
            </div>

            {/* 4th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="fill-current text-green-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <g
                  transform="translate(22 21)"
                  strokeLinecap="square"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    className="stroke-current text-green-100"
                    d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5"
                  />
                  <circle
                    className="stroke-current text-green-300"
                    cx="13"
                    cy="9"
                    r="3"
                  />
                </g>
              </svg>
              <h4 className="h4 mb-2">Security Measures</h4>
              <p className="text-lg text-gray-400 text-center">
                Your security is our top priority. Rest assured that your
                personal and financial information is protected with
                industry-standard security measures, including SSL encryption
                and secure payment gateways.
              </p>
            </div>

            {/* 5th item */}

            {/* 6th item */}
          </div>
        </div>
      </div>
    </section>
  );
}
