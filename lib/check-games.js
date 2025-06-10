const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkGames() {
  try {
    // 获取游戏表的结构
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = 'gm_games'
    `
    console.log('游戏表结构：', columns)

    // 获取前5条游戏数据
    const games = await prisma.$queryRaw`
      SELECT * FROM gm_games LIMIT 5
    `
    console.log('游戏示例数据：', games)

  } catch (error) {
    console.error('查询出错：', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkGames() 