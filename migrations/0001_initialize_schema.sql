-- CreateTable
CREATE TABLE "stores" (
    "shop" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN DEFAULT false,
    "whatsapp_chat_count" INTEGER NOT NULL DEFAULT 0,
    "shopify_id" BIGINT,
    "name" TEXT,
    "email" TEXT,
    "domain" TEXT,
    "province" TEXT,
    "country" TEXT,
    "address1" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "primary_locale" TEXT,
    "address2" TEXT,
    "created_at_shopify" DATETIME,
    "updated_at_shopify" DATETIME,
    "country_code" TEXT,
    "country_name" TEXT,
    "currency" TEXT,
    "customer_email" TEXT,
    "timezone" TEXT,
    "shop_owner" TEXT,
    "money_format" TEXT,
    "province_code" TEXT,
    "county_taxes" BOOLEAN,
    "plan_display_name" TEXT,
    "plan_name" TEXT,
    "has_discounts" BOOLEAN,
    "has_gift_cards" BOOLEAN,
    "myshopify_domain" TEXT,
    "google_apps_domain" TEXT,
    "google_apps_login_enabled" BOOLEAN,
    "eligible_for_payments" BOOLEAN,
    "password_enabled" BOOLEAN,
    "has_storefront" BOOLEAN,
    "primary_location_id" BIGINT,
    "transactional_sms_disabled" BOOLEAN,
    "marketing_sms_consent_enabled_at_checkout" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "onboarding_email" BOOLEAN,
    "whatsapp_number" TEXT,
    "greeting_message" TEXT DEFAULT 'We are here to help you! Chat with us on WhatsApp for any queries.',
    "whatsapp_message" TEXT DEFAULT 'Hello, I''d like to know more about your products'
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT,
    "shop" TEXT
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "clicked" INTEGER NOT NULL DEFAULT 0,
    "page" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "analytics_shop_fkey" FOREIGN KEY ("shop") REFERENCES "stores" ("shop") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "stores_shop_idx" ON "stores"("shop");

-- CreateIndex
CREATE INDEX "stores_domain_idx" ON "stores"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_shop_page_createdAt_key" ON "analytics"("shop", "page", "createdAt");
