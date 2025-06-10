import Navbar from "@/app/components/Navbar";

export default function Game1() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Game 1</h1>
        <div className="aspect-video w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://example-game-url.com"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Game Description</h2>
          <p className="text-gray-600">
            This is an exciting game that you can play right in your browser! 
            Enjoy hours of fun with this amazing game.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Controls:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Use WASD or arrow keys to move</li>
              <li>Space to jump</li>
              <li>Mouse to look around</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 