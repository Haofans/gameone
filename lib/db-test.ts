import { prisma } from './prisma'

async function main() {
  try {
    // 测试数据库连接
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('数据库连接成功！', result)

    // 创建测试游戏数据
    const game = await prisma.game.create({
      data: {
        title: '测试游戏',
        description: '这是一个测试游戏描述',
        imageUrl: 'https://www.playbestgames.online/games-image/f8p53afrxzvzswyvillbj2oz2mxv9e7m/250x150.webp',
        category: 'Action'
      }
    })
    console.log('测试游戏创建成功：', game)

    // 查询所有游戏
    const games = await prisma.game.findMany()
    console.log('所有游戏：', games)

  } catch (error) {
    console.error('数据库操作失败：', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 