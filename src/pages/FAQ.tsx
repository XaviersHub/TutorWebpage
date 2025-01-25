import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is this platform about?",
        answer:
          "This platform connects students with qualified tutors for personalized learning experiences.",
      },
      {
        question: "How do I sign up for an account?",
        answer:
          "Click on 'Sign Up' at the top right and fill out the registration form.",
      },
      {
        question: "How do I contact a tutor?",
        answer: "You can contact tutors via the messaging feature or email.",
      },
    ],
  },
  {
    category: "For Tutees (Students)",
    questions: [
      {
        question: "How do I find the right tutor for me?",
        answer:
          "Use the search filters to find tutors based on subject, level, location, and ratings.",
      },
      {
        question: "Can I request a trial session?",
        answer:
          "Yes, some tutors offer free or discounted trial sessions. Contact them directly to inquire.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "Payments can be made via credit/debit cards, PayPal, or bank transfers.",
      },
    ],
  },
  {
    category: "For Tutors",
    questions: [
      {
        question: "How do I become a tutor on this platform?",
        answer:
          "Click on 'Become a Tutor,' fill out the application form, and upload the necessary documents.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Tutors can receive payments via PayPal, bank transfer, or other preferred methods.",
      },
      {
        question: "Can I set my own rates and schedule?",
        answer:
          "Yes, you have full control over your pricing and availability.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "I'm having trouble logging in. What should I do?",
        answer:
          "Try resetting your password using the 'Forgot Password' link, or contact our support via the chatbot.",
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to your profile settings to update your details.",
      },
      {
        question: "The website isn't loading properly. What should I do?",
        answer:
          "Clear your browser cache, try a different browser, or contact support.",
      },
    ],
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#BDEDF2" }}
      >
        <SearchBar />
        <AccountWidget />
      </div>
      <NavBar />

      <div className="container mt-4">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>

        {faqs.map((section, secIndex) => (
          <div key={secIndex} className="mb-4">
            <h3 className="text-primary">{section.category}</h3>
            <div className="accordion">
              {section.questions.map((faq, index) => (
                <div key={index} className="card mb-2">
                  <div
                    className="card-header"
                    onClick={() => toggleFAQ(secIndex * 100 + index)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {faq.question}
                  </div>
                  {activeIndex === secIndex * 100 + index && (
                    <div className="card-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-5 text-center">
          <h3>Still have questions?</h3>
          <p>
            Our friendly chatbot is available 24/7 to assist you.
            <br />
            <strong>
              Click the chat icon at the bottom right to get instant support!
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
