import type { Metadata } from 'next';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: 'FAQ | ColombiaGame',
  description: 'Find answers to frequently asked questions about ColombiaGame. Learn how to play games, troubleshoot common issues, and get help with your gaming experience.',
  openGraph: {
    title: 'FAQ - ColombiaGame',
    description: 'Get answers to common questions about ColombiaGame and our online gaming platform.',
  }
};

const faqs = [
  {
    question: "How do I start playing games?",
    answer: "Simply browse our game collection, click on any game that interests you, and click the 'Play Now' button. All our games run directly in your web browser - no downloads needed!"
  },
  {
    question: "Are the games free to play?",
    answer: "Yes! All games on ColombiaGame are completely free to play. We believe great gaming should be accessible to everyone."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required to play most games. However, creating an account allows you to save your progress and participate in our community features."
  },
  {
    question: "What browsers are supported?",
    answer: "Our games work best on modern browsers like Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for the best gaming experience."
  },
  {
    question: "Can I play games on mobile devices?",
    answer: "Yes! Our website is mobile-friendly, and many of our games can be played on smartphones and tablets. However, some games might work better on desktop computers."
  },
  {
    question: "What should I do if a game isn't working?",
    answer: "Try refreshing your browser, clearing your cache, or using a different browser. If the problem persists, please contact our support team."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">
            Frequently Asked Questions
          </h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 text-gray-300">
                <h2 className="text-xl font-semibold mb-3 text-white">
                  {faq.question}
                </h2>
                <p>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 text-center text-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Still Have Questions?
            </h2>
            <p className="mb-4">
              We're here to help! Contact our support team and we'll get back to you as soon as possible.
            </p>
            <a 
              href="mailto:support@colombiagame.online"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 