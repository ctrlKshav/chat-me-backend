import crypto from "crypto";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyProxy = (c, next) => {

  const query = c.req.query();

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
    c.res.user_shop = query.shop;
    next();
  } else {
    return c.json({ error: "Unauthorized call" });
  }
};

export default verifyProxy;
