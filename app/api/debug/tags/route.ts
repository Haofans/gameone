import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // 获取 URL 参数
    const { searchParams } = new URL(request.url);
    const tagIds = searchParams.get('ids');
    
    if (!tagIds) {
      // 如果没有提供 ID，返回所有标签
      const allTags = await prisma.gm_tags.findMany({
        take: 100, // 限制返回数量
        orderBy: {
          id: 'asc'
        }
      });
      
      return NextResponse.json({
        message: 'All tags (limited to 100)',
        tags: allTags
      });
    }
    
    // 解析标签 ID
    let parsedIds: number[] = [];
    try {
      if (tagIds.startsWith('[') && tagIds.endsWith(']')) {
        // JSON 格式
        parsedIds = JSON.parse(tagIds).map((id: string) => parseInt(id)).filter((id: number) => !isNaN(id));
      } else {
        // 逗号分隔格式
        parsedIds = tagIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      }
    } catch {
      return NextResponse.json({
        error: 'Failed to parse tag IDs',
        originalInput: tagIds
      }, { status: 400 });
    }
    
    if (parsedIds.length === 0) {
      return NextResponse.json({
        error: 'No valid tag IDs provided',
        originalInput: tagIds
      }, { status: 400 });
    }
    
    // 查询标签
    const foundTags = await prisma.gm_tags.findMany({
      where: {
        id: {
          in: parsedIds
        }
      }
    });
    
    // 检查是否找到所有标签
    const missingIds = parsedIds.filter(id => 
      !foundTags.some(tag => tag.id === id)
    );
    
    return NextResponse.json({
      message: 'Tags found',
      requestedIds: parsedIds,
      foundTags,
      missingIds,
      count: foundTags.length
    });
    
  } catch (error) {
    console.error('Error in debug tags API:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
} 