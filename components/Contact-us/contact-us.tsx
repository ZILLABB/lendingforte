"use client";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    message: "",
    email: "",
  });

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    if (!mapContainer.hasChildNodes()) {
      const map = L.map("map").setView([37.6975, -97.3698], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=6820+W+Central+Ave,+Wichita,+KS+67212&format=json&addressdetails=1&limit=1`;

      fetch(geocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 20);
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup("6820 W Central Ave, Wichita, KS 67212")
            .openPopup();
        })
        .catch(console.error);
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
            Contact Us
          </h1>
          <div className="lg:grid lg:grid-cols-2">
            <div className="mb-6">
              <p className="font-bold text-2xl mb-4">Contact Information:</p>
              <div className="flex items-center mb-2 gap-2">
                <div className="bg-green-600 rounded-full w-8 h-8 p-2 flex items-center justify-center">
                  <FiMapPin className=" " />
                </div>
                <p>Physical Address: 6820 W Central Ave, Wichita, KS 67212</p>
              </div>
              <div className="flex items-center mb-2 gap-2">
                <div className="bg-green-600 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                  <FiPhone className="" />
                </div>
                <div>
                  <p className="text-2xl">
                    Our Phone Number: <br />
                    <a
                      className="text-xl text-green-400 "
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
                <p className="text-2xl">
                  Our Contact Mail: <br />
                  <a
                    className="text-xl text-green-400 "
                    href="mailto:info@lendingforte.com"
                  >
                    info@lendingforte.com
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
          <div id="map" className="h-96 mt-10 rounded-lg"></div>
        </div>
      </div>
    </>
  );
}
