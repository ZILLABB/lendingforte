"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { push, ref } from "firebase/database";
import { database } from "../../config";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    message: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFireBase = () => {
    try {
      const dbRef = ref(database, "contact-us");
      push(dbRef, form);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.", {
        theme: "colored",
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    emailjs
      .send("service_aug4hyu", "template_ff4yied", form, "mRm23xSD-WMIu8ZDK")
      .then(() =>
        toast.success("Your message has been sent successfully!", {
          theme: "colored",
        })
      )
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      );
    handleFireBase();
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-5xl mt-10 text-green-600 text-center mb-6">
            Contact Us
          </h1>
          <div className="lg:grid lg:grid-cols-2">
            <div className="mb-6">
              <p className="font-bold text-2xl mb-4">Contact Information:</p>
              <div className="flex items-center mb-2 gap-2">
                <div className="bg-green-600 rounded-full w-8 h-8 p-2 flex items-center justify-center">
                  <FiMapPin className=" " />
                </div>
                <p className="text-xl text-gray-500">
                  Physical Address: <br />
                  <a className="text-base text-green-400 " href="">
                    6820 W Central Ave, Wichita, KS 67212
                  </a>
                </p>
              </div>
              <div className="flex items-center mb-2 gap-2">
                <div className="bg-green-600 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                  <FiPhone className="" />
                </div>
                <div>
                  <p className="text-xl text-gray-500 ">
                    Our Phone Number: <br />
                    <a
                      className="text-base text-green-400 "
                      href="tel:+13159498539"
                    >
                      +1-(315)-949-8539
                    </a>
                  </p>{" "}
                </div>
              </div>
              <div className="flex items-center mb-2 gap-2">
                <div className="bg-green-600 rounded-full w-8 h-8 p-2 flex items-center justify-center">
                  <FiMail className="" />
                </div>
                <p className="text-xl text-gray-500 ">
                  Our Contact Mail: <br />
                  <a
                    className="text-base text-green-400 "
                    href="mailto:contact@lendingforte.com"
                  >
                    contact@lendingforte.com
                  </a>
                  <br />
                  <a
                    className="text-base text-green-400 "
                    href="mailto:info@lendingforte.com"
                  >
                    info@lendingforte.com
                  </a>
                  <br />
                  <a
                    className="text-base text-green-400 "
                    href="mailto:support@lendingforte.com"
                  >
                    support@lendingforte.com
                  </a>
                </p>{" "}
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-2xl mb-4 leading-normal font-bold">
                  Drop us a <span className="text-green-600">Message</span>
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block  font-bold mb-2" htmlFor="fullName">
                    Your FullName
                  </label>
                  <input
                    className="appearance-none text-black font-inter border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your FullName"
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
                    name="email"
                    value={form.email}
                    onChange={handleChange}
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
                    name="message"
                    value={form.message}
                    onChange={handleChange}
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
          <iframe
            className="mt-10 w-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.7310160329886!2d-97.4019494849608!3d37.69754072978234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bae0e4865ff5b5%3A0x3a5844e11f3776f7!2s6820%20W%20Central%20Ave%2C%20Wichita%2C%20KS%2067212%2C%20USA!5e0!3m2!1sen!2sbd!4v1648143294763!5m2!1sen!2sbd"
            width="600"
            height="450"
            frameBorder="true"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </div>
    </>
  );
}
