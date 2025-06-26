import shopify from "../utils/shopify.js";
import validateJWT from "../utils/validateJWT.js";

const verifyCheckout = async (c, next) => {
  try {
    if (c.method === "OPTIONS") {
      c.status(200).end();
      return;
    }

    const authHeader = c.req.header("authorization");
    if (!authHeader) {
      throw Error("No authorization header found");
    }

    const payload = validateJWT(authHeader.split(" ")[1]);

    let shop = shopify.utils.sanitizeShop(payload.dest.replace("https://", ""));

    if (!shop) {
      throw Error("No shop found, not a valid request");
    }

    c.res.user_shop = shop

    next();
  } catch (e) {
    console.error(
      `---> An error happened at verifyCheckout middleware: ${e.message}`
    );
    return c.json({ error: "Unauthorized call" });
  }
};

export default verifyCheckout;
