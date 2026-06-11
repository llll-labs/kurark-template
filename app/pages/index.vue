<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  description: 'A minimal Nuxt tenant app that extends the Kurark layer.',
  ogDescription: 'A minimal Nuxt tenant app that extends the Kurark layer.',
  ogTitle: config.public.siteName,
  title: config.public.siteName,
})
</script>

<template>
  <main class="min-h-screen bg-default text-default">
    <section class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-5 py-12">
      <ArkLogo />

      <div class="space-y-3">
        <p class="text-sm font-medium uppercase text-muted">
          Kurark tenant template
        </p>
        <h1 class="text-4xl font-semibold tracking-normal sm:text-5xl">
          Minimal Nuxt app on Kurark
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-toned">
          Replace this page with your tenant product surface. The shared Ark runtime already provides auth, shell, files, channels, admin tables, and the core database migrations.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <NuxtLink
          to="/app"
          class="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-inverted transition hover:bg-primary/90"
        >
          <UIcon name="i-lucide-log-in" class="size-4" />
          Open Ark
        </NuxtLink>
        <NuxtLink
          to="https://github.com/llll-labs/kurark"
          target="_blank"
          class="inline-flex h-11 items-center gap-2 rounded-md bg-muted px-4 text-sm font-medium text-highlighted transition hover:bg-elevated"
        >
          <UIcon name="i-lucide-github" class="size-4" />
          Kurark
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
