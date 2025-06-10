import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = 90;
    const categoryId = Number(params.id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.gm_categories.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
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
    console.error('Error in category games API:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 