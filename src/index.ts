import { Hono } from 'hono'
import { logger } from 'hono/logger'

import setupCheck from "./utils/setupCheck.js";

import gdprHandlers from "./controllers/gdpr.js";

import csp from "./middleware/csp.js";
import isInitialLoad from "./middleware/isInitialLoad.js";
import verifyHmac from "./middleware/verifyHmac.js";

import proxyRouter from "./routes/app_proxy/index.js";
import checkoutRouter from "./routes/checkout/index.js";
import appRouter from "./routes/app_routes/index.js";
import graphQLRouter from "./routes/graphql/index.js";

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

app.route("/api/graphql", graphQLRouter);

app.use(csp)

app.use(isInitialLoad);

//Routes to make server calls

app.route("/api/apps", appRouter); //App routes

app.route("/api/proxy_route", proxyRouter); //App Proxy routes

app.route("/api/checkout", checkoutRouter);// Checkout Route

app.post("/api/gdpr/:topic", verifyHmac, ...gdprHandlers);// GDPR Route


export default app;
