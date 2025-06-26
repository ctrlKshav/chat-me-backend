
import { Hono } from "hono";
import getSettingsDebugAPI from "./getSettings.js"
import addAnalyticsDebugAPI from "./addAnalytics.js"

export const debugRouter = new Hono();

debugRouter.get("/debug", async (c) => {
    try {
        return c.json({ content: "Proxy Be Working" });
    } catch (e) {
        console.error(e);
        return c.json({ error: e }, 500);
    }
});

debugRouter.get("/debug/getSettings", getSettingsDebugAPI)

debugRouter.get("/debug/addAnalytics", addAnalyticsDebugAPI)