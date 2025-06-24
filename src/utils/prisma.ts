import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { env } from 'cloudflare:workers'

const prismaClients = {
  async fetch(db: D1Database) {
    const adapter = new PrismaD1(db)
    const prisma = new PrismaClient({ adapter })
    return prisma
  },
}

const prisma = await prismaClients.fetch(env.DB)
export default prisma;
