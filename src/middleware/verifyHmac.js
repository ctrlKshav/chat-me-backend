import crypto from "crypto";
import shopify from "../utils/shopify.js";

const verifyHmac = (c, next) => {
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(c.req.body), "utf8")
      .digest("base64");
    const hmac = c.req.header("x-shopify-hmac-sha256");

    if (shopify.auth.safeCompare(generateHash, hmac)) {
      next();
    } else {
      return c.json({ error: "Unauthorized call" });
    }
  } catch (e) {
    console.log(e);
    return c.json({ error: "Unauthorized call" });
  }
};

export default verifyHmac;
