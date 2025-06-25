import { Hono } from "hono";
import clientProvider from "../../utils/clientProvider.js";
const proxyRouter = new Hono();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
proxyRouter.get("/json", async (c) => {
  try {
    const { client } = await clientProvider.offline.graphqlClient({
      shop: c.locals.user_shop,
    });
    return c.json({ content: "Proxy Be Working" });
  } catch (e) {
    console.error(e);
    return c.json({ error: true });
  }
});

export default proxyRouter;
