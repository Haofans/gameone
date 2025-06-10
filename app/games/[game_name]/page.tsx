'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface Tag {
  name: string;
  url: string;
}

interface GameDetails {
  game_id: number;
  name: string;
  description: string;
  instructions: string;
  game_type: string;
  wt_video: string;
  image: string;
  file: string;
  w: number;
  h: number;
  tags: Tag[];
}

export default function GamePage({ params }: { params: { game_name: string } }) {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'game' | 'video'>('game');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetch(`/api/games/${params.game_name}`)
      .then(res => res.json())
      .then((data: GameDetails) => {
        setGame(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
        setIsLoading(false);
      });
  }, [params.game_name]);

  const toggleFullscreen = () => {
    const gameFrame = document.getElementById('game-frame');
    if (!gameFrame) return;

    if (!isFullscreen) {
      if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const refreshGame = () => {
    const gameFrame = document.getElementById('game-frame') as HTMLIFrameElement;
    if (gameFrame && game) {
      gameFrame.src = game.file;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-400">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mb-4">
          <div className="text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{game.name}</span>
          </div>
        </div>
        
        {/* Game Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-4xl font-bold text-white mb-3">{game.name}</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Game Type Badge */}
            <div className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-md text-sm font-medium border border-blue-800">
              {game.game_type}
            </div>
            
            {/* Game Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${tag.url}`}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Content Tabs */}
          <div className="flex mb-6 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('game')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'game'
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Play Game
              {activeTab === 'game' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'video'
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Watch Video
              {activeTab === 'video' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
              )}
            </button>
          </div>

          {/* Game Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Game/Video Area (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Game/Video Player */}
              {activeTab === 'game' ? (
                <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  <div className="relative" style={{ 
                    width: '100%',
                    height: Math.min(700, game.h),
                    maxHeight: 'calc(100vh - 200px)'
                  }}>
                    <iframe
                      id="game-frame"
                      src={game.file}
                      width={game.w}
                      height={game.h}
                      className="w-full h-full absolute inset-0"
                      allowFullScreen
                      allow="autoplay; fullscreen"
                    />
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium text-white">Playing:</span> {game.name}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={refreshGame}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                      </button>
                      <button 
                        onClick={toggleFullscreen}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        Fullscreen
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  <video
                    className="w-full h-full"
                    controls
                    poster={game.image}
                    preload="metadata"
                  >
                    <source src={game.wt_video} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              
              {/* Game Description */}
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed">{game.description}</p>
                </div>
              </div>
              
              {/* Game Instructions */}
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed">{game.instructions}</div>
                </div>
              </div>
            </div>

            {/* Right: Game Information (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Game Preview */}
              <div className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                <div className="relative aspect-video">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">Game Preview</h3>
                  <div className="text-sm text-gray-400">
                    <p>Type: {game.game_type}</p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="font-semibold text-white mb-3">Share Game</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Related Games */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="font-semibold text-white mb-3">Related Games</h3>
                <div className="space-y-3">
                  {game.tags && game.tags.map((tag, index) => (
                    <div key={index}>
                      <Link
                        href={`/tag/${tag.url}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                      >
                        More {tag.name} Games
                        <span className="ml-2 text-gray-400">→</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}