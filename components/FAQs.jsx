
"use client"
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const FAQs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How can I pay for meta?",
      answer: "You can click here to pay for the meta platform."
    },
    {
      question: "How can I make a new template?",
      answer: "To make a new template, you have to log in to your meta platform."
    },
    {
      question: "How are conversations charged on WhatsApp?",
      answer: "Meta charges based on conversations. Each conversation lasts 24 hours, and if you message a customer again after that period, it starts a new chargeable conversation."
    },
    {
      question: "Can I track the performance of my WhatsApp campaigns?",
      answer: "Yes, you can track key metrics like delivery rate, open rate, and click-through rate. This helps you analyze campaign performance and optimize for better results."
    },
    {
      question: "Is there a limit to the number of messages I can send?",
      answer: "Currently, we have only 1 plan of 5000 contacts. If you need to add more contacts, you can mail us."
    },
    {
      question: "Do customers need to opt-in before I send them messages?",
      answer: "Yes, you must ensure that customers have given consent to receive messages from your business, in compliance with WhatsApp&apos;s policies and data protection regulations."
    },
    {
      question: "What happens if a customer reports my message as spam on WhatsApp?",
      answer: "It&apos;s important to get consent from your customers before sending marketing messages. If a customer reports your message as spam, you may lose the ability to send messages to that number again. In some cases, this could lead to account suspension, and you may need to create a new MaaDiy account to continue using our platform. Always ensure you have permission from your contacts to avoid these issues."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="bg-white p-4 py-12">
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
