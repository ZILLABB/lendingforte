import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="logo">
              <img
                className="h-14 w-14 fill-current"
                src="../images/lendingforte/lending_FORTE__4_-removebg-preview.png"
                alt="Workflow"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/about-us"
                  className="font-medium  hover:text-gray-400 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="font-medium  hover:text-gray-400 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/loan-application"
                  className="btn-sm text-white rounded-full bg-green-600 hover:bg-gray-300 hover:text-gray-800 ml-3"
                >
                  Apply For Loan
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
