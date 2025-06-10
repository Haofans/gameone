import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategories() {
  try {
    const categories = await prisma.$queryRaw`
      SELECT id, name, category_pilot 
      FROM gm_categories 
      ORDER BY id ASC
    `
    console.log('所有分类数据：', categories)
    console.log('总分类数量：', categories.length)

  } catch (error) {
    console.error('查询出错：', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategories() 