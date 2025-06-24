import { Hono } from 'hono'
import prisma from './utils/prisma'

type Bindings = {
  MY_KV: KVNamespace
  DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const stores = await prisma.stores.findMany()
  console.log('stores', stores)
  return c.json(stores)
})

export default app