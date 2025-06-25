import crypto from "crypto";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyProxy = (c, next) => {
  console.log("proxy middleware hit")
  const { signature } = c.req.query;

  const queryURI = c.req._parsedUrl.query
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
    c.res.user_shop = c.req.query.shop;
    next();
  } else {
    return c.json({ error: "Unauthorized call" });
  }
};

export default verifyProxy;
