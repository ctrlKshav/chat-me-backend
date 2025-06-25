import { RequestedTokenType } from "@shopify/shopify-api";
import sessionHandler from "../utils/sessionHandler.js";
import shopify from "../utils/shopify.js";
import freshInstall from "../utils/freshInstall.js";
import prisma from "../lib/prisma.js";
/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const isInitialLoad = async (c, next) => {
  try {
    const shop = c.req.query.shop;
    const idToken = c.req.query.id_token;

    if (shop && idToken) {
      const { session: offlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken,
      });
      const { session: onlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OnlineAccessToken,
      });

      await sessionHandler.storeSession(offlineSession);
      await sessionHandler.storeSession(onlineSession);

      const webhookRegistrar = await shopify.webhooks.register({
        session: offlineSession,
      });

      const isFreshInstall = await prisma.store.findUnique({
        where: {
          shop: onlineSession.shop,
        },
      });

      if (!isFreshInstall || isFreshInstall?.isActive === false) {
        // !isFreshInstall -> New Install
        // isFreshInstall?.isActive === false -> Reinstall
        await freshInstall({ shop: onlineSession.shop });
      }

      console.dir(webhookRegistrar, { depth: null });
    }
    next();
  } catch (e) {
    console.error(`---> An error occured in isInitialLoad`, e);
    return c.json({ error: true });
  }
};

export default isInitialLoad;
