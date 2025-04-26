import React from "react";

const LoanFooter = () => {
  return (
    <footer className="loan-footer border-t bg-white py-8 px-4 text-gray-600 text-sm md:text-base">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Company Information */}
        <p className="leading-relaxed">
          <span className="text-green-600 font-medium">Lending Forte</span> is a
          state-licensed direct lender. See our rates and terms page for more
          information. In Texas,{" "}
          <span className="text-green-600 font-medium">Lending Forte</span> is a
          state-licensed credit access business (CAB) and maintains partnership(s)
          with state-licensed direct lender(s) to facilitate safe and secure loans
          for our customers.
        </p>
        
        {/* Funding Information */}
        <p className="leading-relaxed">
          With an eligible debit card provided, all customers can access instant
          funding.
        </p>
        
        {/* Terms and Privacy */}
        <p className="leading-relaxed">
          By submitting your information, you understand and agree to our{" "}
          <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>{" "}
          and{" "}
          <a href="/terms" className="text-green-600 hover:underline">Terms of Use</a>.
        </p>
        
        {/* APR and Payment Information */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="leading-relaxed mb-3">
            <strong>Short-term Loan 14-day APR Range:</strong> 2731.07% – 514.29% APR varies per
            state regulations. Failure to make timely payments may result in NSF or
            late fees. If your account becomes severely delinquent, it may be turned
            over to a 3rd party collection agency which could impact your credit
            score. Loans do not automatically renew without prior approval. If you
            renew or "rollover" your loan, your principal balance may not be reduced
            and you will owe additional fees and/or interest.
          </p>
          
          <p className="leading-relaxed">
            <strong>Customer Notice:</strong> Short-term advances should be used for short-term
            financial needs only, not as long-term financial solutions. Customers
            with credit difficulties should seek credit counseling.
          </p>
        </div>
        
        {/* California Residents */}
        <p className="leading-relaxed">
          <strong className="font-medium">California residents:</strong> By using this site, you acknowledge disclosure of
          your rights under the California Consumer Privacy Protection Act of 2018
          as disclosed in our{" "}
          <a href="/ca-privacy" className="text-green-600 hover:underline">California Resident's Privacy Policy Addendum</a>.{" "}
          <span className="text-green-600 font-medium">Lending Forte</span>, Inc. is
          licensed by the California Department of Financial Protection and
          Innovation pursuant to the California Deferred Deposit Transaction Law
          and California Debt Collector Licensing Act. License Number: 10977-99.
        </p>
      </div>
    </footer>
  );
};

export default LoanFooter;
