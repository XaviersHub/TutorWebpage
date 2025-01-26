import React, { useState } from "react";
import emailjs from "emailjs-com";
import { db } from "../database/firebaseConfig"; // Import Firebase instance
import { collection, addDoc } from "firebase/firestore";
import "./styles/HeaderSec.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sending email using EmailJS
    emailjs
      .send(
        "service_u04h0o5", // EmailJS service ID
        "template_k5mepkt", // EmailJS template ID
        formData,
        "IBjTw7VEqSOOAxygM" // EmailJS public key
      )
      .then((result) => {
        alert("Message sent successfully!");
        console.log("Email sent:", result.text);
      })
      .catch((error) => {
        alert("Failed to send message.");
        console.log("Email error:", error.text);
      });

    // Storing form data in Firebase Firestore
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date(),
      });
      alert("Message stored successfully!");
    } catch (error) {
      alert("Error storing message.");
      console.error("Firestore error:", error);
    }

    // Clear the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container mt-4 form-padder">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject:
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
