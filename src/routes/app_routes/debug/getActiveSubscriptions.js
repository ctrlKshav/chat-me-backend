import { createFactory } from "hono/factory";
import clientProvider from "../../../utils/clientProvider.js";

const factory = createFactory()

const getActiveSubscriptionsAPI = factory.createHandlers(async (c) => {
    try {
        const { client } = await clientProvider.offline.graphqlClient({
            shop: c.locals.user_session.shop,
        });
        const response = await client.request(/* GraphQL */ `
        {
          appInstallation {
            activeSubscriptions {
              name
              status
              lineItems {
                plan {
                  pricingDetails {
                    ... on AppRecurringPricing {
                      __typename
                      price {
                        amount
                        currencyCode
                      }
                      interval
                    }
                  }
                }
              }
              test
            }
          }
        }
      `);

        return c.json(response);
    } catch (e) {
        console.error(e);
        return c.json({ error: true });
    }
});

export default getActiveSubscriptionsAPI;
