import prisma from "./prisma";

const freshInstall = async ({ shop }) => {
  try {
    const restClient = new shopify.clients.Rest({
      session,
      apiVersion: process.env.SHOPIFY_API_VERSION,
    });
    const storeData = await restClient.get({
      path: `/admin/api/${process.env.SHOPIFY_API_VERSION}/shop.json`,
    });

    await prisma.stores.upsert({
      where: {
        shop: shop,
      },
      update: {
        isActive: true,
        shopify_id: storeData.body.shop.id,
        name: storeData.body.shop.name,
        email: storeData.body.shop.email,
        domain: storeData.body.shop.domain,
        province: storeData.body.shop.province,
        country: storeData.body.shop.country,
        address1: storeData.body.shop.address1,
        zip: storeData.body.shop.zip,
        city: storeData.body.shop.city,
        phone: storeData.body.shop.phone,
        latitude: storeData.body.shop.latitude,
        longitude: storeData.body.shop.longitude,
        primary_locale: storeData.body.shop.primary_locale,
        address2: storeData.body.shop.address2,
        created_at_shopify: new Date(storeData.body.shop.created_at),
        updated_at_shopify: new Date(storeData.body.shop.updated_at),
        country_code: storeData.body.shop.country_code,
        country_name: storeData.body.shop.country_name,
        currency: storeData.body.shop.currency,
        customer_email: storeData.body.shop.customer_email,
        timezone: storeData.body.shop.timezone,
        shop_owner: storeData.body.shop.shop_owner,
        money_format: storeData.body.shop.money_format,
        province_code: storeData.body.shop.province_code,
        county_taxes: storeData.body.shop.county_taxes,
        plan_display_name: storeData.body.shop.plan_display_name,
        plan_name: storeData.body.shop.plan_name,
        has_discounts: storeData.body.shop.has_discounts,
        has_gift_cards: storeData.body.shop.has_gift_cards,
        myshopify_domain: storeData.body.shop.myshopify_domain,
        google_apps_domain: storeData.body.shop.google_apps_domain,
        google_apps_login_enabled:
          storeData.body.shop.google_apps_login_enabled,
        eligible_for_payments: storeData.body.shop.eligible_for_payments,
        password_enabled: storeData.body.shop.password_enabled,
        has_storefront: storeData.body.shop.has_storefront,
        primary_location_id: storeData.body.shop.primary_location_id,
        transactional_sms_disabled:
          storeData.body.shop.transactional_sms_disabled,
        marketing_sms_consent_enabled_at_checkout:
          storeData.body.shop.marketing_sms_consent_enabled_at_checkout,
      },
      create: {
        shop: shop,
        isActive: true,
        shopify_id: storeData.body.shop.id,
        name: storeData.body.shop.name,
        email: storeData.body.shop.email,
        domain: storeData.body.shop.domain,
        province: storeData.body.shop.province,
        country: storeData.body.shop.country,
        address1: storeData.body.shop.address1,
        zip: storeData.body.shop.zip,
        city: storeData.body.shop.city,
        phone: storeData.body.shop.phone,
        latitude: storeData.body.shop.latitude,
        longitude: storeData.body.shop.longitude,
        primary_locale: storeData.body.shop.primary_locale,
        address2: storeData.body.shop.address2,
        created_at_shopify: new Date(storeData.body.shop.created_at),
        updated_at_shopify: new Date(storeData.body.shop.updated_at),
        country_code: storeData.body.shop.country_code,
        country_name: storeData.body.shop.country_name,
        currency: storeData.body.shop.currency,
        customer_email: storeData.body.shop.customer_email,
        timezone: storeData.body.shop.timezone,
        shop_owner: storeData.body.shop.shop_owner,
        money_format: storeData.body.shop.money_format,
        province_code: storeData.body.shop.province_code,
        county_taxes: storeData.body.shop.county_taxes,
        plan_display_name: storeData.body.shop.plan_display_name,
        plan_name: storeData.body.shop.plan_name,
        has_discounts: storeData.body.shop.has_discounts,
        has_gift_cards: storeData.body.shop.has_gift_cards,
        myshopify_domain: storeData.body.shop.myshopify_domain,
        google_apps_domain: storeData.body.shop.google_apps_domain,
        google_apps_login_enabled:
          storeData.body.shop.google_apps_login_enabled,
        eligible_for_payments: storeData.body.shop.eligible_for_payments,
        password_enabled: storeData.body.shop.password_enabled,
        has_storefront: storeData.body.shop.has_storefront,
        primary_location_id: storeData.body.shop.primary_location_id,
        transactional_sms_disabled:
          storeData.body.shop.transactional_sms_disabled,
        marketing_sms_consent_enabled_at_checkout:
          storeData.body.shop.marketing_sms_consent_enabled_at_checkout,
      },
    });
  } catch (e) {
    console.error(
      `---> An error occured in freshInstall function: ${e.message}`,
      e
    );
  }
};

export default freshInstall;
