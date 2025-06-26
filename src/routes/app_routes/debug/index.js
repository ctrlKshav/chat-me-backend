import { Hono } from "hono";
import gqlAPI from "./gql.js";
import activeWebhooksAPI from "./activeWebhooks.js";
import getActiveSubscriptionsAPI from "./getActiveSubscriptions.js";
import createNewSubscriptionAPI from "./createNewSubscriptions.js";

export const debugRouter = new Hono();

debugRouter.get("/", async (c) => {
  try {
    return c.json({ content: "App Routes Debug Be Working" });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
})

debugRouter.get("/gql", ...gqlAPI);

debugRouter.get("/activeWebhooks", ...activeWebhooksAPI);

debugRouter.get("/getActiveSubscriptions", ...getActiveSubscriptionsAPI);

debugRouter.get("/createNewSubscription", ...createNewSubscriptionAPI);