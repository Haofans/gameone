import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tags = await prisma.gm_tags.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        total_games: true
      },
      where: {
        show_home: 1
      },
      orderBy: {
        total_games: 'desc'
      }
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
} 