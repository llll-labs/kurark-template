# Agent Notes

- This repo is a template. Keep it minimal and tenant-neutral.
- The app extends `@kurark/layer`; do not copy Kurark core code here.
- With no infrastructure envs, local dev should use Kurark embedded PGlite and local uploads.
- Add tenant-specific physical tables only in the app repo, under `app.app_*`.
- Generic runtime behavior belongs in Kurark, not in this template.
