import { Hono } from "hono";
import prisma from "../../lib/prisma"
const proxyRouter = new Hono();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
proxyRouter.get("/json", async (c) => {
  try {
    console.log('hi')
    return c.json({ content: "Proxy Be Working" });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
});

proxyRouter.get("/getSettings", async (c) => {

  const myShop = c.req.query.shop
  try {
    if (!myShop) {
      return c.json({ error: "No shop provided" });
    }
    const settings = await prisma.stores.findFirst({
      where: {
        OR: [
          {
            shop: myShop,
          },
          {
            domain: myShop,
          },
        ],
      },
      select: {
        whatsapp_number: true,
        greeting_message: true,
        whatsapp_message: true,
      },
    });
    console.info(settings);
    return c.json({ ...settings });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
});

proxyRouter.post("/addAnalytics", async (c) => {
  try {
    const data = await c.req.parseBody();
    const { country, device_type, path, shopUrl, platform, clicked } = data;
    const dateCreated = new Date().toLocaleDateString("en-IN");
    const analyticsEntry = await prisma.analytics.upsert({
      where: {
        analytics_unique_key: {
          shop: shopUrl.slice(8),
          page: path,
          createdAt: dateCreated,
        },
      },
      update: {
        clicked: { increment: clicked },
      },
      create: {
        shop: shopUrl.slice(8),
        page: path,
        country: country,
        device: device_type,
        clicked: clicked,
        os: platform,
        createdAt: dateCreated,
      },
    });
    return c.json({ analyticsEntry });
  }
  catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
})


export default proxyRouter;