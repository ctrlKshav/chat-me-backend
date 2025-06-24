
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

export interface Env {
  DB: D1Database
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })

    const stores = await prisma.stores.findMany()
    const result = JSON.stringify(stores)
    return new Response(result)
  },
}