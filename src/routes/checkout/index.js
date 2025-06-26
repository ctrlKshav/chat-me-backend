import { Hono } from "hono";
import verifyCheckout from "../../middleware/verifyCheckout.js";
const checkoutRouter = new Hono();

checkoutRouter.get("/", verifyCheckout, async (c) => {
  try {
    return c.json({ message: "It works!" });
  } catch (e) {
    console.error(`An error occured at /api/checkout`);
    return c.json({ error: true });
  }
});

export default checkoutRouter;
