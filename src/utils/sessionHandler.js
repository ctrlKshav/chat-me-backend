import { Session } from "@shopify/shopify-api";
import Cryptr from "cryptr";
import prisma from "../lib/prisma";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

/**
 * Stores the session data into the database.
 *
 * @param {Session} session - The Shopify session object.
 * @returns {Promise<boolean>} Returns true if the operation was successful.
 */
const storeSession = async (session) => {
  await prisma.session.update({
    where: {
      id: session.id,
    },
    data: {
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    },
  });

  return true;
};

/**
 * Loads the session data from the database.
 *
 * @param {string} id - The session ID.
 * @returns {Promise<Session | undefined>} Returns the Shopify session object or
 *   undefined if not found.
 */
const loadSession = async (id) => {
  const sessionResult = await prisma.session.findUnique({ where: { id } });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

/**
 * Deletes the session data from the database.
 *
 * @param {string} id - The session ID.
 * @returns {Promise<boolean>} Returns true if the operation was successful.
 */
const deleteSession = async (id) => {
  await prisma.session.delete({ where: { id } });
  return true;
};

/**
 * Session handler object containing storeSession, loadSession, and
 * deleteSession functions.
 */
const sessionHandler = { storeSession, loadSession, deleteSession };

export default sessionHandler;
