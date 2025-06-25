/**
 *
 * It's relatively easy to overload this function that will result in a long first open time.
 * If something can happen in the background, don't `await FreshInstall()` and instead just
 * `FreshInstall()` in isInitialLoad function.
 *
 */

import prisma from "../lib/prisma";

const freshInstall = async ({ shop }) => {
  console.log("This is a fresh install - run functions");
  await prisma.store.update({
    where: {
      shop: shop,
    },
    data: {
      isActive: true,
    },
  });
};

export default freshInstall;
