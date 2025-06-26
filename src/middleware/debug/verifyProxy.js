
const verifyProxy = async (c, next) => {

    const query = c.req.query();
    if (!query.shop || !query.signature) {
        return c.json({ error: "Unauthorized call" });
    }
    c.req.user_shop = query.shop;

    await next();
};

export default verifyProxy;
