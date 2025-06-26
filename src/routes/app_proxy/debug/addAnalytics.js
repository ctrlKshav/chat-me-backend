import prisma from "../../../lib/prisma";

const addAnalyticsDebugAPI = async (c) => {
    try {
        const data = await c.req.parseBody();
        const { country, device_type, path, shopUrl, platform, clicked } = data;
        const dateCreated = new Date().toLocaleDateString("en-IN");
        const analyticsEntry = await prisma.analytics.upsert({
            where: {
                analytics_unique_key: {
                    shop: shopUrl.slice(8),
                    page: path,
                    createdAt: dateCreated,
                },
            },
            update: {
                clicked: { increment: clicked },
            },
            create: {
                shop: shopUrl.slice(8),
                page: path,
                country: country,
                device: device_type,
                clicked: clicked,
                os: platform,
                createdAt: dateCreated,
            },
        });
        return c.json({ analyticsEntry });
    }
    catch (e) {
        console.error(e);
        return c.json({ error: e }, 500);
    }
}
export default addAnalyticsDebugAPI;