<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <div class="inline-flex items-center gap-2 font-semibold text-highlighted" :class="size === 'sm' ? 'text-base' : 'text-xl'">
    <span class="inline-flex items-center justify-center rounded-md bg-primary/15 text-primary" :class="size === 'sm' ? 'size-8' : 'size-10'">
      <UIcon name="i-lucide-box" :class="size === 'sm' ? 'size-4' : 'size-5'" />
    </span>
    <span>{{ $config.public.appName }}</span>
  </div>
</template>
