import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    // Example form validation
    if (!formData.name || !formData.email || !formData.message) {
      setLoading(false);
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Simulating an API call for message submission
      // const response = await fetch("http://localhost:5000/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // If successful, show success message
      setLoading(false);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to send your message. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-8 pt-20 pb-20 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900">Contact Me</h2>
      <p className="text-gray-600 text-center mb-6">
        Feel free to reach out for collaborations, inquiries, or just to connect. Use the form below or the social links to get in touch.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Message"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      <div className="text-center mt-6">
        <h3 className="text-lg font-semibold mb-4">Connect with Me</h3>
        <p className="text-gray-600 mb-4">You can also reach out to me via social media or email:</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/swetapadmakar95"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/swetapadmakar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="mailto:swetapadmakar95@gmail.com"
            className="text-red-500 hover:text-red-700"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
