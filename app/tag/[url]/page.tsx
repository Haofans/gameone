'use client';

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import GameTags from "../../components/GameTags";
import Footer from "../../components/Footer";

interface Game {
  game_id: number;
  name: string;
  game_name: string;
  image: string;
  wt_video: string;
}

interface TagInfo {
  id: number;
  name: string;
  url: string;
}

interface GamesResponse {
  games: Game[];
  totalPages: number;
  currentPage: number;
  tag: TagInfo;
}

export default function TagPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const tagUrl = params.url as string;
  const currentPage = Number(searchParams.get('page')) || 1;
  const [gamesData, setGamesData] = useState<GamesResponse>({ 
    games: [], 
    totalPages: 1, 
    currentPage: 1,
    tag: { id: 0, name: '', url: '' } 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/tags/${tagUrl}/games?page=${currentPage}`)
      .then(res => res.json())
      .then((data: GamesResponse) => {
        setGamesData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tag games:', error);
        setIsLoading(false);
      });
  }, [tagUrl, currentPage]);

  // Generate pagination buttons array
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(gamesData.totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < gamesData.totalPages) {
      if (endPage < gamesData.totalPages - 1) buttons.push('...');
      buttons.push(gamesData.totalPages);
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="pt-16">
        <div className="container mx-auto">
          <div className="flex">
            {/* Fixed left sidebar */}
            <div className="fixed left-0 top-16 bottom-0 z-40 p-4">
              <div className="h-full overflow-y-auto hide-scrollbar">
                <Sidebar />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 ml-8">
              {/* Fixed tags area */}
              <div className="fixed top-16 left-[80px] right-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 pt-4">
                <div className="container mx-auto">
                  <GameTags currentTag={tagUrl} />
                </div>
              </div>

              {/* Tag title */}
              <div className="mt-24 mb-4">
                <div className="container mx-auto px-4">
                  {!isLoading && gamesData.tag && (
                    <h1 className="text-2xl font-bold text-white">
                      {gamesData.tag.name}
                    </h1>
                  )}
                </div>
              </div>

              {/* Games grid */}
              <div className="mb-4">
                <div className="container mx-auto px-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : gamesData.games.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {gamesData.games.map((game) => (
                        <Link 
                          key={game.game_id} 
                          href={`/game/${game.game_name}`}
                          className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                          <div className="relative w-full" style={{ height: '150px' }}>
                            <Image
                              src={game.image}
                              alt={game.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              priority={game.game_id <= 12}
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <h3 className="text-white text-sm font-medium p-2 truncate">
                                {game.name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center min-h-[400px]">
                      <p className="text-gray-400 text-lg">No games found with this tag</p>
                    </div>
                  )}

                  {/* Pagination navigation */}
                  {gamesData.games.length > 0 && (
                    <div className="mt-8 mb-8 flex justify-center items-center gap-2">
                      <Link
                        href={currentPage === 1 ? `/tag/${tagUrl}` : `/tag/${tagUrl}/${Math.max(1, currentPage - 1)}`}
                        className={`px-4 py-2 rounded transition-colors ${
                          currentPage === 1
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </span>
                      </Link>

                      <div className="flex gap-2">
                        {generatePaginationButtons().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-gray-500">
                              ...
                            </span>
                          ) : (
                            <Link
                              key={`page-${page}`}
                              href={page === 1 ? `/tag/${tagUrl}` : `/tag/${tagUrl}/${page}`}
                              className={`px-3 py-1.5 rounded transition-colors ${
                                page === currentPage
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {page}
                            </Link>
                          )
                        ))}
                      </div>

                      <Link
                        href={`/tag/${tagUrl}/${Math.min(gamesData.totalPages, currentPage + 1)}`}
                        className={`px-4 py-2 rounded transition-colors ${
                          currentPage === gamesData.totalPages
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          Next
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile navigation button */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => document.querySelector('aside')?.classList.toggle('hidden')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
} 