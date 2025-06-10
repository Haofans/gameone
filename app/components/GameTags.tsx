'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tag {
  id: number;
  name: string;
  url: string;
  total_games?: number;
}

interface GameTagsProps {
  currentTag?: string;
}

const GameTags = ({ currentTag }: GameTagsProps) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => {
        setTags(data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-2 pb-4 px-4">
      {tags.map((tag) => (
            <Link
          key={tag.id}
          href={`/tag/${tag.url}`}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            currentTag === tag.url
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {tag.name}
          {tag.total_games && tag.total_games > 0 && (
            <span className="ml-1 text-xs opacity-60">({tag.total_games})</span>
          )}
            </Link>
      ))}
    </div>
  );
};

export default GameTags; 