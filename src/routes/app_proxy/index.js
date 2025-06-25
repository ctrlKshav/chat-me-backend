import { Hono } from "hono";
import clientProvider from "../../utils/clientProvider.js";
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

export default proxyRouter;
