import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const games = [
  {
    id: "game1",
    title: "Game 1",
    description: "An exciting adventure game you can play in your browser!",
    imageUrl: "/game-placeholder.jpg",
  },
  {
    id: "game2",
    title: "Game 2",
    description: "A challenging puzzle game for all ages!",
    imageUrl: "/game-placeholder.jpg",
  },
  {
    id: "game3",
    title: "Game 3",
    description: "Fast-paced action game that will keep you on your toes!",
    imageUrl: "/game-placeholder.jpg",
  },
];

export default function Games() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          All Games
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-4">
                  {game.description}
                </p>
                <Link 
                  href={`/games/${game.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Play Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 