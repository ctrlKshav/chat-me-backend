import { createFactory } from "hono/factory"
import clientProvider from "../../../utils/clientProvider.js"

const factory = createFactory()

const gqlAPI = factory.createHandlers(async (c) => {
    try {
        //false for offline session, true for online session
        const { client } = await clientProvider.offline.graphqlClient({
            shop: c.locals.user_session.shop,
        });

        const shop = await client.request(/* GraphQL */ `
            {
              shop {
                name
              }
            }
          `);

        return c.json({ text: shop.data.shop.name });
    } catch (e) {
        console.error(e);
        return c.json({ error: true, text: "GQL Query broke" });
    }
});

export default gqlAPI;


