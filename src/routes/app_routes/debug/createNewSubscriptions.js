import { createFactory } from "hono/factory"

const factory = createFactory()

const createNewSubscriptionAPI = factory.createHandlers(
    async (c) => {
        try {
            const { client, shop } = await clientProvider.offline.graphqlClient({
                shop: c.locals.user_session.shop,
            });
            const returnUrl = `${process.env.SHOPIFY_APP_URL}/?shop=${shop}`;

            const planName = "$10.25 plan";
            const planPrice = 10.25; //Always a decimal

            const response = await client.request(
                  /* GraphQL */ `
                    mutation CreateSubscription(
                      $name: String!
                      $lineItems: [AppSubscriptionLineItemInput!]!
                      $returnUrl: URL!
                      $test: Boolean
                    ) {
                      appSubscriptionCreate(
                        name: $name
                        returnUrl: $returnUrl
                        lineItems: $lineItems
                        test: $test
                      ) {
                        userErrors {
                          field
                          message
                        }
                        confirmationUrl
                        appSubscription {
                          id
                          status
                        }
                      }
                    }
                  `,
                {
                    variables: {
                        name: planName,
                        returnUrl: returnUrl,
                        test: true,
                        lineItems: [
                            {
                                plan: {
                                    appRecurringPricingDetails: {
                                        price: {
                                            amount: planPrice,
                                            currencyCode: "USD",
                                        },
                                        interval: "EVERY_30_DAYS",
                                    },
                                },
                            },
                        ],
                    },
                }
            );

            if (response.data.appSubscriptionCreate.userErrors.length > 0) {
                console.log(
                    `--> Error subscribing ${shop} to plan:`,
                    response.data.appSubscriptionCreate.userErrors
                );
                c.json({ error: "An error occured." });
                return;
            }

            return c.json({
                confirmationUrl: `${response.data.appSubscriptionCreate.confirmationUrl}`,
            });
        } catch (e) {
            console.error(e);
            return c.json({ error: true });
        }
    }
);

export default createNewSubscriptionAPI;
