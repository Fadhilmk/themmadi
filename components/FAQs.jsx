"use client"
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';


const FAQs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "What services do you provide?",
      answer: "We offer a variety of services including web development, mobile app development, and design services."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to our support team via email at support@example.com or call us at +123456789."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all our services."
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we provide custom solutions tailored to your business needs. Contact us for more details."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-blue-500 focus:outline-none"
                onClick={() => toggleQuestion(index)}
                style={{fontFamily: 'LeagueSpartan, sans-serif'}}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`w-6 h-6 transform transition-transform ${openQuestion === index ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
              {openQuestion === index && (
                <p style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;