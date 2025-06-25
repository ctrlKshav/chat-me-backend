import prisma from "../lib/prisma.js";

/**
 * @typedef { import("../../_developer/types/2025-04/webhooks.js").APP_UNINSTALLED } webhookTopic
 */

const appUninstallHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  /** @type {webhookTopic} */
  const webhookBody = JSON.parse(webhookRequestBody);
  await prisma.stores.update({
    where: {
      shop: shop,
    },
    data: {
      isActive: false,
    },
  });
  await prisma.session.deleteMany({ where: { shop } });
};

export default appUninstallHandler;
