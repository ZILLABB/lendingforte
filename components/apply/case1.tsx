// This is a temporary file to hold the case 1 content
export const case1Content = () => {
  return (
    <ModernFormSection
      title="Loan Details"
      description="Tell us about the loan you're looking for"
      icon={<BanknotesIcon className="w-5 h-5" />}
      isActive={true}
    >
      <div className="space-y-6">
        {/* Loan Type */}
        <FormField
          label="Loan Type"
          name="loanType"
          error={errors.loanType}
          required
        >
          <select
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${
              errors.loanType ? 'border-red-500' : 'border-dark-50'
            } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Loan Type</option>
            <option value="personal">Personal Loan</option>
            <option value="auto">Auto Loan</option>
            <option value="home">Home Loan</option>
            <option value="business">Business Loan</option>
            <option value="education">Education Loan</option>
            <option value="debt-consolidation">Debt Consolidation</option>
          </select>
        </FormField>

        {/* Loan Amount */}
        <FormField
          label="Loan Amount"
          name="loanAmount"
          error={errors.loanAmount}
          required
          tooltip="Enter the amount you wish to borrow, between $1,000 and $100,000"
        >
          <CurrencyInput
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onValueChange={(value) => handleValueChange('loanAmount', value)}
            placeholder="$5,000"
            error={!!errors.loanAmount}
          />
        </FormField>

        {/* Loan Purpose */}
        <FormField
          label="Loan Purpose"
          name="loanPurpose"
          error={errors.loanPurpose}
          required
        >
          <select
            id="loanPurpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${
              errors.loanPurpose ? 'border-red-500' : 'border-dark-50'
            } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Purpose</option>
            <option value="debt-consolidation">Debt Consolidation</option>
            <option value="home-improvement">Home Improvement</option>
            <option value="major-purchase">Major Purchase</option>
            <option value="business">Business</option>
            <option value="auto">Auto</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </FormField>

        {/* Loan Term */}
        <FormField
          label="Loan Term"
          name="loanTerm"
          error={errors.loanTerm}
          required
        >
          <select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${
              errors.loanTerm ? 'border-red-500' : 'border-dark-50'
            } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Term</option>
            <option value="12">12 months (1 year)</option>
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
          </select>
        </FormField>

        {/* Estimated Monthly Payment */}
        {estimatedPayment !== null && (
          <div className="mt-6 p-4 bg-dark-100/50 border border-primary-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Estimated Monthly Payment</p>
                <p className="text-2xl font-semibold text-primary-400">
                  ${estimatedPayment.toFixed(2)}
                </p>
              </div>
              <div className="bg-primary-500/20 p-2 rounded-full">
                <BanknotesIcon className="w-6 h-6 text-primary-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is an estimate based on an 8% APR. Your actual rate may vary
              based on your credit profile and other factors.
            </p>
          </div>
        )}
      </div>
    </ModernFormSection>
  );
};
