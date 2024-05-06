'use client';
import { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderIcon = (index: any) => {
    return activeIndex === index ? "-" : "+";
  };

  return (
    <div className="container mx-auto px-4 text-gray-500 mt-40 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-600">
            Frequently Asked Questions
          </h1>
          <h1 className="text-xl text-gray-500">
            Have a question about Lending Forte or online payday loans? We have
            the answers.
                  </h1>
                  
        </div>
        <div className="accordion-item border-b border-t border-gray-300">
          <div
            className="accordion-title text-lg font-semibold py-2 cursor-pointer"
            onClick={() => toggleAccordion(0)}
          >
            <h1 className="hover:text-green-600">
              {renderIcon(0)} Am I eligible for a loan?
            </h1>
          </div>
          {activeIndex === 0 && (
            <div className="accordion-content py-2">
              <p className="mb-2 text-base">
                To qualify for a loan, applicants must:
              </p>
              <ul className="list-disc   pl-6">
                <li>Be at least 18 years old;</li>
                <li>Have a valid email address;</li>
                <li>
                  Have a verifiable name, date of birth, and social security
                  number;
                </li>
                <li>Earn a minimum annual income of $12,000;</li>
                <li>
                  Meet our lending partners’ minimum credit requirements; and
                </li>
                <li>
                  Have a personal bank account at a U.S. financial institution
                  with a routing transit number;
                </li>
                <li>
                  Have a full time job, a full time job offer starting within 6
                  months, a regular part time job, or another source of regular
                  income;
                </li>
              </ul>
              <p className="mb-2 mt-2 text-base">
                Additional requirements may apply. However, when you check your
                rate on Upstart, it will not impact your credit score. Please
                note that not everyone who applies will be approved.
              </p>
            </div>
          )}
        </div>
        <div className="accordion-item border-b border-gray-300">
          <div
            className="accordion-title text-lg hover:text-green-600 font-semibold py-2 cursor-pointer"
            onClick={() => toggleAccordion(1)}
          >
            <h1 className="hover:text-green-600">
              {renderIcon(1)} When and how do I receive my loan?
            </h1>
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content py-2">
              <p className="mb-2 text-base">
                The timing of when you receive the funds depends on when you
                sign the promissory note. If you accept the loan before 5:00
                P.M. ET on a business day (Monday to Friday), we initiate a
                transfer of funds on the next business day. However, if you
                accept the loan after 5:00 P.M. ET on a business day, we may
                initiate the funds transfer 2 business days later.
                <p className="mb-2 mt-2 text-base">
                  If you accept the loan on a non-business day, like a bank
                  holiday or a weekend, the disbursement process will start on
                  the next business day. In this case, you’ll receive the loan
                  proceeds 2 business days after you sign the promissory note.
                </p>
                <p className="mb-2 mt-2 text-base">
                  The time you receive the funds may vary depending on the loan
                  product you are taking and the lending partner originating the
                  loan. To receive personal loan proceeds you must add and
                  verify a personal bank account in your name. The loan proceeds
                  will be directly deposited into that account. We cannot accept
                  business accounts.
                </p>
              </p>
            </div>
          )}
        </div>
        <div className="accordion-item border-b border-gray-300">
          <div
            className="accordion-title text-lg font-semibold py-2 cursor-pointer"
            onClick={() => toggleAccordion(2)}
          >
            <h1 className="hover:text-green-600">
              {renderIcon(2)} What is the minimum credit requirements to receive
              a loan?
            </h1>
          </div>
          {activeIndex === 2 && (
            <div className="accordion-content py-2">
              To be eligible for a loan, these are the minimum credit
              requirements:
              <ul className="list-decimal   pl-6">
                <li className="mb-2 mt-2 text-base">
                  Different Lending Forte lending partners have different
                  minimum credit scores. In addition, we may accept applicants
                  with insufficient credit history to produce a credit score.
                </li>
                <li className="mb-2 mt-2 text-base">
                  Your credit report should not have any significant changes
                  from the time the rate was offered to you until you sign the
                  promissory note.
                </li>
                <li className="mb-2 mt-2 text-base">
                  We consider the amount of debt you have in relation to your
                  income.
                </li>{" "}
                <li className="mb-2 mt-2 text-base">
                  Different Lending Forte partners may or may not review items
                  on your credit report such as bankruptcies or public records.
                </li>
                <li className="mb-2 mt-2 text-base">
                  Additional minimum credit requirements may apply depending on
                  the lender with which Lending Forte matches you.
                </li>
              </ul>
              <div className="mb-2 mt-2 ml-6 text-base">
                <p className="mb-2 mt-2 text-base">
                  Keep in mind that the credit score received by the lender may
                  differ from the one reported by your credit monitoring
                  services if the monitoring service is using a different credit
                  bureau or scoring method.{" "}
                </p>
                <p className="mb-2 mt-2 text-base">
                  If you believe there are any errors on your credit report,
                  please reach out to TransUnion and/or Equifax. Here are their
                  contact details:
                </p>{" "}
                <p className="mb-2 mt-2 text-base">
                  Name:TransUnion
                  <br />
                  Telephone number: 1-800-916-8800
                  <br /> Website: www.transunion.com
                </p>{" "}
                <p className="mb-2 mt-2 text-base">
                  Name: Equifax
                  <br />
                  Telephone number: 1-888-548-7878
                  <br /> Website: www.equifax.com
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item border-b border-gray-300">
          <div
            className="accordion-title text-lg font-semibold py-2 cursor-pointer"
            onClick={() => toggleAccordion(3)}
          >
            <h1 className="hover:text-green-600">
              {renderIcon(3)} What can you use your loan proceeds for?
            </h1>
          </div>
          {activeIndex === 3 && (
            <div className="accordion-content py-2">
              You can use your loan proceeds for almost anything. The following
              are are examples of permissible personal loan use:
              <ul className="list-decimal   pl-6">
                <li className="mb-2 mt-2 text-base">Pay off credit cards</li>
                <li className="mb-2 mt-2 text-base">
                  Start or expand your business or build a business
                </li>
                <li className="mb-2 mt-2 text-base">
                  Pay medical bills or other expenses.
                </li>{" "}
                <li className="mb-2 mt-2 text-base">Pay rent.</li>
                <li className="mb-2 mt-2 text-base">Make a large purchase</li>
                <li className="mb-2 mt-2 text-base">Relocate and travel</li>
              </ul>
              <div className="mb-2 mt-2 ml-6 text-base">
                <p className="mb-2 mt-2 text-base">
                  Please note that the lender you are matched with may not offer
                  all of the examples listed.
                </p>{" "}
                <p className="mb-2 mt-2 text-base">
                  This list may not be holistic of all products offered by
                  Lending Forte.
                </p>{" "}
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item border-b border-gray-300">
          <div
            className="accordion-title text-lg hover:text-green-600 font-semibold py-2 cursor-pointer"
            onClick={() => toggleAccordion(4)}
          >
            <h1 className="hover:text-green-600">
              {renderIcon(4)} When and how do I receive my loan?
            </h1>
          </div>{" "}
          {activeIndex === 4 && (
            <div className="accordion-content py-2">
              <p className="mb-2 text-base">
                You are responsible for repaying the full principal amount and
                the accrued interest over your specified loan term through
                monthly installments. If you wish, you can also make early
                payments without incurring any penalties.
                <p className="mb-2 mt-2 text-base">
                  Please note that early payments in one month won’t replace the
                  next month’s payment obligation. Instead, they will be applied
                  to the principal, reducing the overall duration of your loan.
                </p>
                <p className="mb-2 mt-2 text-base">
                  Failing to meet your monthly payment obligation could result
                  in negative credit reporting to credit bureaus, which may
                  impact your credit score and/or repossession of the vehicle
                  (if applicable).
                </p>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
