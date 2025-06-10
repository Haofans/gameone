'use client';

import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GameTags from "./components/GameTags";
import Footer from "./components/Footer";

interface Game {
  game_id: number;
  name: string;
  game_name: string;
  image: string;
  wt_video: string;
}

interface GamesResponse {
  games: Game[];
  totalPages: number;
  currentPage: number;
}

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [gamesData, setGamesData] = useState<GamesResponse>({ games: [], totalPages: 40, currentPage: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/games?page=${currentPage}`)
      .then(res => res.json())
      .then((data: GamesResponse) => {
        setGamesData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      });
  }, [currentPage]);

  // 生成分页按钮数组
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(gamesData.totalPages, startPage + maxVisibleButtons - 1);

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
      {/* 固定导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* 主要内容区域 */}
      <div className="pt-16">
        <div className="container mx-auto">
          <div className="flex">
            {/* 固定的左侧导航 */}
            <div className="fixed left-0 top-16 bottom-0 z-40 p-4">
              <div className="h-full overflow-y-auto hide-scrollbar">
                <Sidebar />
              </div>
            </div>

            {/* 主内容区域 */}
            <div className="flex-1 ml-8">
              {/* 固定的标签区域 */}
              <div className="fixed top-16 left-[80px] right-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 pt-4">
                <div className="container mx-auto">
                  <GameTags />
                </div>
              </div>

              {/* 游戏网格 */}
              <div className="mt-24">
                <div className="container mx-auto px-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
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
                              alt={`Play ${game.name} - Free Online Game at ColombiaGame`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                              priority={game.game_id <= 12}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <h2 className="text-white text-sm font-medium p-2 truncate">
                                {game.name}
                              </h2>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  )}

                  {/* 分页导航 */}
                  <div className="mt-8 mb-8 flex justify-center items-center gap-2">
                    <Link
                      href={currentPage === 1 ? '/' : `/page/${Math.max(1, currentPage - 1)}`}
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
                            href={page === 1 ? '/' : `/page/${page}`}
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
                      href={`/page/${Math.min(gamesData.totalPages, currentPage + 1)}`}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <Footer />

      {/* 移动端导航按钮 */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => document.querySelector('aside')?.classList.toggle('hidden')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}