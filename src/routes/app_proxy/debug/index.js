
import { Hono } from "hono";
import getSettingsDebugAPI from "./getSettings.js"
import addAnalyticsDebugAPI from "./addAnalytics.js"

export const debugRouter = new Hono();

debugRouter.get("/", async (c) => {
    try {
        return c.json({ content: "Proxy Be Working" });
    } catch (e) {
        console.error(e);
        return c.json({ error: e }, 500);
    }
});

debugRouter.get("/getSettings", getSettingsDebugAPI)

debugRouter.get("/addAnalytics", addAnalyticsDebugAPI)