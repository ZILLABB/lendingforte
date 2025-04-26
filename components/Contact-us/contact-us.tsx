"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { push, ref } from "firebase/database";
import { database } from "../../config";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    message: "",
    email: "",
    subject: "",
    phone: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!form.fullName || !form.email || !form.message) {
      toast.error("Please fill all required fields", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }
    
    emailjs
      .send("service_aug4hyu", "template_ff4yied", form, "mRm23xSD-WMIu8ZDK")
      .then(() => {
        toast.success("Your message has been sent successfully!", {
          theme: "colored",
        });
        
        // Clear form after successful submission
        setForm({
          fullName: "",
          message: "",
          email: "",
          subject: "",
          phone: ""
        });
      })
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      )
      .finally(() => {
        setLoading(false);
      });
    
    handleFireBase();
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-500 inline-block text-transparent bg-clip-text mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Have questions about our services? Ready to get started? Our team is here to help you.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-12 gap-0">
            {/* Contact Information */}
            <motion.div 
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="md:col-span-5 bg-gradient-to-br from-green-600 to-green-700 text-white p-8 md:p-10"
            >
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-6 mb-auto">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/30 rounded-full w-10 h-10 p-2.5 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90 mb-1">Our Location</h3>
                      <p className="text-white/80">
                        6820 W Central Ave, <br />
                        Wichita, KS 67212
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/30 rounded-full w-10 h-10 p-2.5 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90 mb-1">Call Us</h3>
                      <p className="text-white/80">
                        <a href="tel:+13159498539" className="hover:text-white transition-colors">
                          +1-(315)-949-8539
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/30 rounded-full w-10 h-10 p-2.5 flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90 mb-1">Email Us</h3>
                      <p className="text-white/80">
                        <a href="mailto:contact@lendingforte.com" className="hover:text-white transition-colors">
                          contact@lendingforte.com
                        </a>
                      </p>
                      <p className="text-white/80">
                        <a href="mailto:info@lendingforte.com" className="hover:text-white transition-colors">
                          info@lendingforte.com
                        </a>
                      </p>
                      <p className="text-white/80">
                        <a href="mailto:support@lendingforte.com" className="hover:text-white transition-colors">
                          support@lendingforte.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Icons */}
                <div className="mt-8 pt-8 border-t border-green-500/30">
                  <h3 className="font-medium mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-green-500/30 hover:bg-green-500/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="bg-green-500/30 hover:bg-green-500/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                    </a>
                    <a href="#" className="bg-green-500/30 hover:bg-green-500/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="bg-green-500/30 hover:bg-green-500/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="md:col-span-7 p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label 
                      htmlFor="fullName"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="absolute left-3 text-gray-400">
                        <FiUser className="w-5 h-5" />
                      </span>
                      <input
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label 
                      htmlFor="email"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="absolute left-3 text-gray-400">
                        <FiMail className="w-5 h-5" />
                      </span>
                      <input
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label 
                      htmlFor="phone"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <span className="absolute left-3 text-gray-400">
                        <FiPhone className="w-5 h-5" />
                      </span>
                      <input
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label 
                      htmlFor="subject"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <div className="flex items-center">
                      <span className="absolute left-3 text-gray-400">
                        <HiOutlineChatAlt2 className="w-5 h-5" />
                      </span>
                      <input
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        id="subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Loan Inquiry"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label 
                    htmlFor="message"
                    className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    className={`bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        
        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            className="w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.7310160329886!2d-97.4019494849608!3d37.69754072978234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bae0e4865ff5b5%3A0x3a5844e11f3776f7!2s6820%20W%20Central%20Ave%2C%20Wichita%2C%20KS%2067212%2C%20USA!5e0!3m2!1sen!2sbd!4v1648143294763!5m2!1sen!2sbd"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </>
  );
}
