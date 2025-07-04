import crypto from "crypto";

const verifyProxy = async (c, next) => {

  const query = c.req.query();
  if (!query.shop || !query.signature) {
    return c.json({ error: "Unauthorized call" });
  }

  const signature = query.signature

  const rawQuery = c.req.url.split("?")[1]

  const queryURI = rawQuery
    .replace("/?", "")
    .replace(/&signature=[^&]*/, "")
    .split("&")
    .map((x) => decodeURIComponent(x))
    .sort()
    .join("");

  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(queryURI, "utf-8")
    .digest("hex");

  if (calculatedSignature === signature) {
    c.req.user_shop = query.shop;
    await next();
  } else {
    return c.json({ error: "Unauthorized call" });
  }
};

export default verifyProxy;
