import { Hono } from 'hono'
import { logger } from 'hono/logger'

import sessionHandler from "./utils/sessionHandler.js";
import setupCheck from "./utils/setupCheck.js";
import shopify from "./utils/shopify.js";

import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./controllers/gdpr.js";

import csp from "./middleware/csp.js";
import isInitialLoad from "./middleware/isInitialLoad.js";
import verifyCheckout from "./middleware/verifyCheckout.js";
import verifyHmac from "./middleware/verifyHmac.js";
import verifyRequest from "./middleware/verifyRequest.js";

import proxyRouter from "./routes/app_proxy/index.js";
import checkoutRouter from "./routes/checkout/index.js";
import appRouter from "./routes/app_routes/index.js";

import webhookHandler from "./webhooks/_index.js";

setupCheck(); // Run a check to ensure everything is setup properly

const app = new Hono()

app.use(logger())

//For Quick Testing
app.get("/", (c) => {
  return c.text("Hello World!");
});

// Incoming webhook requests
app.post(
  "/api/webhooks/:webhookTopic*",
  webhookHandler
);

app.post("/api/graphql", verifyRequest, async (c) => {
  try {
    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: c.req,
      rawResponse: c.res,
    });
    const session = await sessionHandler.loadSession(sessionId);
    const response = await shopify.clients.graphqlProxy({
      session,
      rawBody: await c.req.parseBody(),
    });
    return c.json(response.body);
  } catch (e) {
    console.error(`---> An error occured at GraphQL Proxy`, e);
    return c.json({ error: e }, 403);
  }
});

app.use(csp)

app.use(isInitialLoad);

//Routes to make server calls

app.route("/api/apps", appRouter); //App routes

app.route("/api/proxy_route", proxyRouter); //App Proxy routes

app.route("/api/checkout", checkoutRouter);

app.post("/api/gdpr/:topic", verifyHmac, async (c) => {
  const body = await c.req.parseBody();
  const topic = c.req.param("topic");
  const shop = body.shop_domain;

  console.warn(`--> GDPR request for ${shop} / ${topic} recieved.`);

  let response;
  switch (topic) {
    case "customers_data_request":
      response = await customerDataRequest(topic, shop, body);
      break;
    case "customers_redact":
      response = await customerRedact(topic, shop, body);
      break;
    case "shop_redact":
      response = await shopRedact(topic, shop, body);
      break;
    default:
      console.error(
        "--> Congratulations on breaking the GDPR route! Here's the topic that broke it: ",
        topic
      );
      response = "broken";
      break;
  }

  if (response.success) {
    return c.json({ success: true });
  } else {
    return c.json({ success: false });
  }
});




export default app
