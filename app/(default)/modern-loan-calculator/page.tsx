import ModernLoanCalculator from "@/components/loan-calculator/modern-loan-calculator";

export const metadata = {
  title: "Modern Loan Calculator - Lending Forte",
  description: "Calculate your loan payments with our modern, interactive loan calculator",
};

export default function ModernLoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
            Modern Loan Calculator
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Plan your finances with precision using our advanced loan calculator. Visualize payments, interest, and amortization schedules with our interactive tool.
          </p>
        </div>
        
        <ModernLoanCalculator />
        
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>
            This calculator is for illustrative purposes only. Actual loan terms and rates may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
