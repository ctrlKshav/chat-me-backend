import { createFactory } from "hono/factory";
import verifyHmac from "../middleware/verifyHmac";

const factory = createFactory();

const gdprHandlers = factory.createHandlers(verifyHmac, async (c) => {
  const body = await c.req.parseBody();
  const topic = c.req.param("topic");
  const shop = body.shop_domain;

  console.warn(`--> GDPR request for ${shop} / ${topic} recieved.`);

  let response;
  switch (topic) {
    case "customers_data_request":
      response = await customerDataRequest(topic, shop, body);
      break;
    case "customers_redact":
      response = await customerRedact(topic, shop, body);
      break;
    case "shop_redact":
      response = await shopRedact(topic, shop, body);
      break;
    default:
      console.error(
        "--> Congratulations on breaking the GDPR route! Here's the topic that broke it: ",
        topic
      );
      response = "broken";
      break;
  }

  if (response.success) {
    return c.json({ success: true });
  } else {
    return c.json({ success: false });
  }
});

/**
 *
 * CUSTOMER_DATA_REQUEST
 *
 */

const customerDataRequest = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com",
  //   "orders_requested": [
  //     123456,
  //     123456,
  //     123456,
  //   ],
  //   "customer": {
  //     "id": 123456,
  //     "email": "email@email.com",
  //     "phone": "123-123-1231"
  //   },
  //   "data_request": {
  //     "id": 1111
  //   }
  // }
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

/**
 *
 * CUSTOMER_REDACT
 *
 */

const customerRedact = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com",
  //   "customer": {
  //     "id": 123456,
  //     "email": "email@email.com",
  //     "phone": "123-123-1234"
  //   },
  //   "orders_to_redact": [
  //     123456,
  //     123456,
  //     123456
  //   ]
  // }
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

/**
 *
 * SHOP_REDACT
 *
 */

const shopRedact = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com"
  // }
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export { customerDataRequest, customerRedact, shopRedact };

export default gdprHandlers;
