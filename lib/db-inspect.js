const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function inspectDatabase() {
  try {
    // 获取所有表名
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('数据库中的表：', tables)

    // 获取第一个表的结构
    if (Array.isArray(tables) && tables.length > 0) {
      const firstTable = tables[0].table_name
      const columns = await prisma.$queryRaw`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = ${firstTable}
      `
      console.log(`表 ${firstTable} 的结构：`, columns)

      // 尝试获取第一个表的前5条数据
      const sampleData = await prisma.$queryRaw`
        SELECT * FROM "${firstTable}" LIMIT 5
      `
      console.log(`表 ${firstTable} 的示例数据：`, sampleData)
    }

  } catch (error) {
    console.error('查询出错：', error)
  } finally {
    await prisma.$disconnect()
  }
}

inspectDatabase() 