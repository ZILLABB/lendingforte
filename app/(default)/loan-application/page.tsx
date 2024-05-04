import LoanApplicationPage from "@/components/loan-application/loan-application";
// import { useClient } from 'next/data-client';

export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};


export default function loanapplication() {
  return (
    <>
      <LoanApplicationPage />
    </>
  );
}
