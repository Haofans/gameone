import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 90;
  const categoryId = Number(context.params.id);

  try {
    // Check if category exists
    const category = await prisma.gm_categories.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Get total games count for this category
    const totalGames = await prisma.gm_games.count({
      where: {
        category: categoryId,
        NOT: {
          wt_video: null
        }
      }
    });

    // Get games for this category
    const games = await prisma.gm_games.findMany({
      where: {
        category: categoryId,
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
      currentPage: page,
      category: {
        id: category.id,
        name: category.name,
        category_pilot: category.category_pilot
      }
    });
  } catch (error) {
    console.error('Error fetching category games:', error);
    return NextResponse.json({ error: 'Failed to fetch category games' }, { status: 500 });
  }
} 