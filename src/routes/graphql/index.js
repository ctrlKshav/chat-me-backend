import shopify from "../../utils/shopify.js";
import sessionHandler from "../../utils/sessionHandler.js";
import { Hono } from "hono";
import verifyRequest from "../../middleware/verifyRequest.js";

const graphQLRouter = new Hono();

graphQLRouter.post("/graphql", verifyRequest, graphQLHandler);

const graphQLHandler = async (c) => {
    try {
        const sessionId = await shopify.session.getCurrentId({
            isOnline: true,
            rawRequest: c.req,
            rawResponse: c.res,
        });
        const session = await sessionHandler.loadSession(sessionId);
        const response = await shopify.clients.graphqlProxy({
            session,
            rawBody: await c.req.parseBody(),
        });
        return c.json(response.body);
    } catch (e) {
        console.error(`---> An error occured at GraphQL Proxy`, e);
        return c.json({ error: e }, 403);
    }
}

export default graphQLRouter;