import { Hono } from "hono";
const checkoutRoutes = new Hono();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
checkoutRoutes.get("/", async (c) => {
  try {
    return c.json({ message: "It works!" });
  } catch (e) {
    console.error(`An error occured at /api/checkout`);
    return c.json({ error: true });
  }
});

export default checkoutRoutes;
