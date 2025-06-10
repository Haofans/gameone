import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.gm_categories.findMany({
      select: {
        id: true,
        name: true,
        category_pilot: true,
        image: true,
        show_home: true,
        total_games: true
      },
      orderBy: {
        id: 'asc'
      }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
} 