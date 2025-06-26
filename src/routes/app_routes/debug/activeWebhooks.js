import { createFactory } from "hono/factory";
import clientProvider from "../../../utils/clientProvider.js";

const factory = createFactory()

const activeWebhooksAPI = factory.createHandlers(async (c) => {
    try {
        const { client } = await clientProvider.offline.graphqlClient({
            shop: c.locals.user_session.shop,
        });
        const activeWebhooks = await client.request(/* GraphQL */ `
        {
          webhookSubscriptions(first: 25) {
            edges {
              node {
                topic
                endpoint {
                  __typename
                  ... on WebhookHttpEndpoint {
                    callbackUrl
                  }
                }
              }
            }
          }
        }
      `);
        return c.json(activeWebhooks);
    } catch (e) {
        console.error(e);
        return c.json({ error: true });
    }
});

export default activeWebhooksAPI;
