import { Hono } from "hono";

import debugRouter from "./debug/index.js"
import getSettingsAPI from "./getSettings.js"
import addAnalyticsAPI from "./addAnalytics.js"
import verifyProxy from "../../middleware/verifyProxy.js"

const proxyRouter = new Hono();

proxyRouter.route("/debug", debugRouter)

proxyRouter.get("/getSettings", verifyProxy, getSettingsAPI)
proxyRouter.post("/addAnalytics", verifyProxy, addAnalyticsAPI)

export default proxyRouter;