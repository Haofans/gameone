import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface TotalGamesResult {
  count: string | number;
}

interface GameResult {
  game_id: number;
  name: string;
  game_name: string;
  image: string;
  wt_video: string;
}

export async function GET(
  request: Request,
  { params }: { params: { url: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 90;
  const tagUrl = params.url;

  try {
    // Find tag by URL
    const tag = await prisma.gm_tags.findFirst({
      where: { url: tagUrl }
    });

    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    // Get games with this tag
    // We need to use raw SQL because tags_ids is stored as JSON
    const totalGamesResult = await prisma.$queryRaw<TotalGamesResult[]>`
      SELECT COUNT(*) as count
      FROM gm_games
      WHERE tags_ids::jsonb ? ${tag.id.toString()}
      AND wt_video IS NOT NULL
    `;
    const totalGames = Number(totalGamesResult[0].count);

    const games = await prisma.$queryRaw<GameResult[]>`
      SELECT 
        game_id,
        name,
        game_name,
        image,
        wt_video
      FROM gm_games
      WHERE tags_ids::jsonb ? ${tag.id.toString()}
      AND wt_video IS NOT NULL
      ORDER BY game_id DESC
      LIMIT ${pageSize}
      OFFSET ${(page - 1) * pageSize}
    `;

    return NextResponse.json({
      games,
      totalPages: Math.ceil(totalGames / pageSize),
      currentPage: page,
      tag: {
        id: tag.id,
        name: tag.name,
        url: tag.url
      }
    });
  } catch (error) {
    console.error('Error fetching tag games:', error);
    return NextResponse.json({ error: 'Failed to fetch tag games' }, { status: 500 });
  }
} 