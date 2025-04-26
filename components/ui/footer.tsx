import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-6">
                {/* Logo */}
                <Link href="/" className="inline-block" aria-label="Lending Forte">
                  <Image
                    src="/images/lendingforte/logod.png"
                    alt="Lending Forte Logo"
                    width={150}
                    height={48}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              <div className="text-gray-400 mb-6">
                Lending Forte is dedicated to providing straightforward and
                accessible loan solutions to meet your financial needs.
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-green-500" />
                  <a
                    className="text-gray-400 hover:text-green-500 transition duration-150 ease-in-out"
                    href="tel:+13159498539"
                  >
                    +1-(315)-949-8539
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-green-500" />
                  <a
                    className="text-gray-400 hover:text-green-500 transition duration-150 ease-in-out"
                    href="mailto:info@lendingforte.com"
                  >
                    info@lendingforte.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-400">
                    6820 W Central Ave, Wichita, KS 67212, USA
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6 items-center">
                {[
                  {
                    src: "/images/lendingforte/badges/simplesecuretrusted-desktop.png",
                    alt: "Simple, Secure, Trusted badge"
                  },
                  {
                    src: "/images/lendingforte/badges/8000-5-Star-Reviews200px.png",
                    alt: "8000 5-Star Reviews badge"
                  },
                  {
                    src: "/images/lendingforte/badges/Fast-Online-Payday-Loans-badge.png",
                    alt: "Fast Online Payday Loans badge"
                  }
                ].map((badge, index) => (
                  <Image
                    key={index}
                    src={badge.src}
                    alt={badge.alt}
                    width={56}
                    height={56}
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">
              {/* Products */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-4 text-lg">Products</h6>
                <ul className="space-y-3">
                  {[
                    { href: "/personal-loan", label: "Personal Loans" },
                    { href: "/business-loan", label: "Business Loans" },
                    { href: "/mortgage", label: "Mortgage Loans" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-green-500 transition duration-150 ease-in-out flex items-center gap-1"
                      >
                        <span>→</span> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-4 text-lg">Resources</h6>
                <ul className="space-y-3">
                  {[
                    { href: "/term-of-use", label: "Terms of Use" },
                    { href: "/faq", label: "FAQ" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-green-500 transition duration-150 ease-in-out flex items-center gap-1"
                      >
                        <span>→</span> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-4 text-lg">Company</h6>
                <ul className="space-y-3">
                  {[
                    { href: "/about-us", label: "About Us" },
                    { href: "/contact-us", label: "Contact Us" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-green-500 transition duration-150 ease-in-out flex items-center gap-1"
                      >
                        <span>→</span> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between pt-5 border-t border-gray-800">
            {/* Social links - uncomment if needed */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {[
                { icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", 
                  label: "GitHub" },
                { icon: "M22.258 1H2.742C1.781 1 1 1.781 1 2.742v18.516C1 22.219 1.781 23 2.742 23h9.796v-8.458h-2.66v-3.355h2.66V8.436c0-2.698 1.693-4.138 4.13-4.138 1.172 0 2.177.087 2.471.126v2.772h-1.696c-1.33 0-1.588.632-1.588 1.558v2.032h3.16l-.42 3.355h-2.74V23h5.37c.96 0 1.742-.781 1.742-1.742V2.742C24 1.781 23.219 1 22.258 1z", 
                  label: "Facebook" },
                { icon: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.962-.689 1.801-1.56 2.46-2.548l-.047-.02z", 
                  label: "Twitter" },
                { icon: "M7.443 5.3496h8.4d4.328v0h.001c1.007 0 1.826.82 1.826 1.826v5.15c0 1.007-.82 1.827-1.826 1.827h-5.15v.878h3.837c.235 0 .431.188.456.422l.163 1.557a.476.476 0 01-.476.522H7.945a.451.451 0 01-.32-.132.442.442 0 01-.132-.319v-2.928h-.5A1.39 1.39 0 016 12.341V7.176A1.39 1.39 0 017.39 5.787h.053zm8.894 2.781a1.825 1.825 0 10-.001 3.65 1.825 1.825 0 00.001-3.65z", 
                  label: "LinkedIn" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                  aria-label={social.label}
                >
                  <svg 
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Lending Forte. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
