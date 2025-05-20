import LoanApplicationForm from "@/components/loan-application/loan-application-form";

export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Apply for a loan with our secure and easy-to-use online application form",
};

export default function LoanApplicationPage() {
  return (
    <>
      <LoanApplicationForm />
    </>
  );
}
