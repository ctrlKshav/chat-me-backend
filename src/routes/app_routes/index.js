import { Hono } from "hono";
import { debugRouter } from "./debug/index.js"
import verifyRequest from "../../middleware/verifyRequest.js"

const appRouter = new Hono();

appRouter.get("/", verifyRequest, (c) => {
  try {
    const sendData = { text: "This is coming from /api/apps/ route." };
    return c.json(sendData);
  } catch (e) {
    console.error(e);
    return c.json({ error: true });
  }
});

appRouter.route("/debug", debugRouter)


export default appRouter;
