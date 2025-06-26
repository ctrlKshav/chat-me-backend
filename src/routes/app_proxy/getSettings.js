import prisma from "../../lib/prisma"

const getSettingsAPI = async (c) => {

  const myShop = c.req.user_shop
  try {
    if (!myShop) {
      return c.json({ error: "No shop provided" });
    }
    const settings = await prisma.stores.findFirst({
      where: {
        OR: [
          {
            shop: myShop,
          },
          {
            domain: myShop,
          },
        ],
      },
      select: {
        whatsapp_number: true,
        greeting_message: true,
        whatsapp_message: true,
      },
    });
    return c.json({ ...settings });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
}

export default getSettingsAPI;