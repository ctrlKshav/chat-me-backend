import shopify from "../utils/shopify.js";

const csp = async (c, next) => {
  await next();
  const shop = c.req.query("shop") || "*.myshopify.com";
  if (shopify.config.isEmbeddedApp && shop) {
    c.res.headers.append('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com`)
  } else {
    c.res.headers.append('Content-Security-Policy', `frame-ancestors 'none'`)
  }
};

export default csp;
