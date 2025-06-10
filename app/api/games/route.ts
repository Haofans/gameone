import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 90;

  try {
    // 获取总数
    const totalGames = await prisma.gm_games.count({
      where: {
        NOT: {
          wt_video: null
        }
      }
    });

    // 获取分页数据
    const games = await prisma.gm_games.findMany({
      where: {
        NOT: {
          wt_video: null
        }
      },
      select: {
        game_id: true,
        name: true,
        game_name: true,
        image: true,
        wt_video: true
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        game_id: 'desc'
      }
    });

    return NextResponse.json({
      games,
      totalPages: Math.ceil(totalGames / pageSize),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
} 