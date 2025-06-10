import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { game_name: string } }
) {
  try {
    // 获取游戏详情
    const game = await prisma.gm_games.findFirst({
      where: {
        game_name: params.game_name
      },
      select: {
        game_id: true,
        name: true,
        description: true,
        instructions: true,
        game_type: true,
        tags_ids: true,
        wt_video: true,
        image: true,
        file: true,
        w: true,
        h: true
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // 处理标签
    let tags: Array<{ name: string; url: string }> = [];
    let parsedTagIds: number[] = [];
    
    if (game.tags_ids) {
      try {
        // 尝试解析 JSON 字符串
        let tagIdsArray;
        
        if (game.tags_ids.startsWith('[') && game.tags_ids.endsWith(']')) {
          tagIdsArray = JSON.parse(game.tags_ids);
        } else {
          // 可能是逗号分隔的字符串
          tagIdsArray = game.tags_ids.split(',');
        }
        
        if (Array.isArray(tagIdsArray) && tagIdsArray.length > 0) {
          // 将字符串数字转换为数字类型
          parsedTagIds = tagIdsArray.map(id => 
            typeof id === 'string' ? parseInt(id.trim()) : id
          ).filter(id => !isNaN(id));
        }
      } catch (error) {
        console.error('Error parsing tags_ids:', error);
        // 尝试作为单个数字处理
        const singleId = parseInt(game.tags_ids);
        if (!isNaN(singleId)) {
          parsedTagIds = [singleId];
        }
      }
    }
    
    // 获取标签数据，包括 URL 字段
    if (parsedTagIds.length > 0) {
      console.log('Looking for tag IDs:', parsedTagIds);
      
      const tagRecords = await prisma.gm_tags.findMany({
        where: {
          id: {
            in: parsedTagIds
          }
        },
        select: {
          id: true,
          name: true,
          url: true
        }
      });
      
      console.log('Found tag records:', tagRecords);
      tags = tagRecords.map(tag => ({
        name: tag.name,
        url: tag.url
      }));
    }

    return NextResponse.json({
      ...game,
      tags,
      parsedTagIds // 添加解析后的标签ID用于调试
    });
  } catch (error) {
    console.error('Error fetching game details:', error);
    return NextResponse.json({ error: 'Failed to fetch game details' }, { status: 500 });
  }
} 