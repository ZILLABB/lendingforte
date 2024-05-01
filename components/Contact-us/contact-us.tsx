import React from "react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">Contact Us</h1>
        <p className=" text-center mb-6">
          Have questions? We're here to help! Please fill out the form below
          and we'll get back to you as soon as possible.
        </p>
        <form>
          <div className="mb-6">
            <label className="block  font-bold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              className="appearance-none text-black font-inter border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-6">
            <label className="block  font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              className="appearance-none text-black border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label className="block  font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="appearance-none border rounded text-black w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
              id="message"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
