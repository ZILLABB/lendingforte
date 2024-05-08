import Head from "next/head";

const AboutUsPage = () => {
  return (
    <div>
      <section className=" mt-10 leading-8 font-normal p-4 text-gray-500">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-inter text-green-600 text-center font-bold mb-6">
            About Us
          </h1>
          <p className="mb-2">
            At{" "}
            <span className="text-green-600 font-semibold font-inter ">
              Lending Forte
            </span>
            , we understand the importance of financial flexibility and
            accessibility. We believe that everyone should have the opportunity
            to achieve their dreams and goals, regardless of their financial
            background.
          </p>
          <p className="mb-2">
            With years of experience in the lending industry we have decided to
            become a leading provider of loan solutions. At{" "}
            <span className="text-green-600 font-semibold font-inter ">
              Lending Forte
            </span>{" "}
            , we have built a reputation for excellence, reliability, and
            transparency. Our mission is simple: to provide innovative loan
            solutions that empower individuals and businesses to thrive.
          </p>
          <div className="lg:flex gap-6 ">
            <img
              className="rounded-lg h-[400px] "
              src="../images/lendingforte/vecteezy_financial-loan-calculator-or-lending-for-car-and-home-loan_6453650.JPG"
              alt=""
            />
            <p className="mb-2 leading-7 ">
              What sets us apart is our commitment to personalized service and
              tailored lending options. We take the time to understand our
              clients' unique needs and circumstances, ensuring that we offer
              the most suitable loan products with competitive rates and
              flexible terms. At{" "}
              <span className="text-green-600 font-semibold font-inter ">
                Lending Forte
              </span>
              , integrity and trust are at the core of everything we do. We
              adhere to strict ethical standards and regulatory guidelines to
              safeguard our clients' interests and maintain the highest level of
              professionalism. Whether you're looking to finance a home, start a
              business, or consolidate debt, we're here to help you every step
              of the way. Our dedicated team of experts is ready to assist you
              in finding the right loan solution to achieve your financial
              objectives. Join the thousands of satisfied customers who have
              entrusted us with their lending needs. Experience the difference
              with Your Lending Forte today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
