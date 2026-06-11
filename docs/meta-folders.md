# Meta Folders

Use a meta folder when a tenant needs the app repo and a local Kurark checkout side by side.

Recommended shape:

```txt
tenant-meta/
- kurark/          # OSS core runtime clone
- tenant-mono/     # tenant Nuxt app created from kurark-template
```

Create it:

```bash
mkdir -p tenant-meta
cd tenant-meta
git clone git@github.com:llll-labs/kurark.git kurark
git clone git@github.com:llll-labs/kurark-template.git tenant-mono
cd tenant-mono
git remote set-url origin git@github.com:<owner>/<tenant-repo>.git
pnpm install
pnpm db:migrate
pnpm dev
```

Rules:

- `kurark/` stays the reusable OSS layer checkout.
- `tenant-mono/` owns tenant UI, tenant settings, and tenant app tables.
- Core tables and migrations stay in Kurark.
- Tenant physical tables should live in an app-owned schema such as `app.app_*`.
- If tenant code needs a core hook, add a generic extension point to Kurark and register tenant behavior from the app.
