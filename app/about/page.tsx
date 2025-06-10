import type { Metadata } from 'next';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: 'About Us | ColombiaGame',
  description: 'Learn more about ColombiaGame - your premier destination for free online gaming entertainment. Discover our mission, values, and commitment to providing the best gaming experience.',
  openGraph: {
    title: 'About ColombiaGame - Free Online Games Platform',
    description: 'Learn more about ColombiaGame and our mission to provide the best free online gaming experience.',
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">About ColombiaGame</h1>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-gray-300">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Welcome to ColombiaGame</h2>
              <p className="mb-4">
                ColombiaGame is your premier destination for free online gaming entertainment. 
                We curate and host the best browser-based games from around the web, making them 
                easily accessible to players worldwide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
              <p className="mb-4">
                Our mission is to provide a safe, enjoyable, and accessible gaming platform for 
                players of all ages. We believe that great games should be available to everyone, 
                anywhere, without the need for downloads or installations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Why Choose Us?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Carefully curated selection of high-quality games</li>
                <li>No downloads required - play directly in your browser</li>
                <li>Regular updates with new games</li>
                <li>Safe and secure gaming environment</li>
                <li>Mobile-friendly interface</li>
                <li>24/7 customer support</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 