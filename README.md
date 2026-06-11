# Kurark Template

Minimal Nuxt tenant app that extends `@kurark/layer`.

Use this repo as a GitHub template when starting a new ark tenant.

## Start

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

With no `.env`, Kurark uses the embedded local runtime:

- PGlite database at `.ark/<PORT>/database`
- local uploads at `.ark/<PORT>/uploads`
- in-process Nitro cache

`PORT` defaults to `5400`.

## What To Change

- `package.json` name
- `.env.example` defaults
- `NUXT_PUBLIC_APP_NAME`
- `ARK_DEFAULT_SLUG`
- `app/pages/index.vue`
- `app/components/ArkLogo.vue`

When the tenant needs stable product tables, add an app-owned Drizzle chain under `server/db/schema.ts` and `drizzle/`. Keep tenant tables under `app.app_*`; do not mutate `public.ark_*` from the tenant app.

## Meta Folder Setup

See [docs/meta-folders.md](docs/meta-folders.md) for the recommended `{tenant, kurark}` sibling checkout layout.
