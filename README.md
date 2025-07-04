# Keshav Notes 

This is the backend of Chat Me Shopify Plugin.
Built on top of shopify-node-express-mongodb Boilerplate.

https://github.com/kinngh/shopify-node-express-mongodb-app.git

However, I am using hono and cloudflare workers instead of express and prisma, d1 instead of mongodb.

Unlike the next repo, there are no auth routes in this backend because shopify has deprecated the legacy auth flow.
Now we our app uses shopify.toml and shopify automatically handles the installation auth flow.

### Cloudflare D1
Faced wrangler authentication issue while trying to create D1 database with the cli.
Finally I set up a system environment variable `CLOUDFLARE_API_TOKEN` to resolve the issue.
Create the token from cloudflare dashboard with Account/D1/Write permissions.

### Prisma and D1
Prisma doesn't yet offer a smooth D1 integration. Maybe it does but I ran into a lot of issues setting it up.
Hence we'll have to use wrangler to apply the migrations.

# Deployment Steps
```txt
pnpm install
pnpm run dev
```

```txt
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
