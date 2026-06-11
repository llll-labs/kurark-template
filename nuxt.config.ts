import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

function loadEnvFile(path: string) {
  if (!existsSync(path))
    return

  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#'))
      continue
    const separator = trimmed.indexOf('=')
    if (separator <= 0)
      continue
    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2')
    process.env[key] ??= value
  }
}

loadEnvFile(resolve(import.meta.dirname, '.env'))

function devHostFromValue(raw: string) {
  const value = raw.trim()
  if (!value)
    return ''

  let host = ''
  try {
    host = new URL(value).hostname
  }
  catch {
    host = value.replace(/^https?:\/\//, '').split(/[:/]/)[0] ?? ''
  }

  if (host.startsWith('*.'))
    return `.${host.slice(2)}`
  return host
}

function devAllowedHosts() {
  const hosts = new Set(['localhost', '127.0.0.1'])
  const sources = [
    process.env.BETTER_AUTH_URL ?? '',
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? '').split(','),
    ...(process.env.VITE_ALLOWED_HOSTS ?? '').split(','),
  ]
  for (const raw of sources) {
    const value = raw.trim()
    if (!value)
      continue
    const host = devHostFromValue(value)
    if (host)
      hosts.add(host)
  }
  return [...hosts].filter(Boolean)
}

function devPort(raw: string | undefined) {
  if (raw) {
    const parsed = Number.parseInt(raw, 10)
    if (Number.isFinite(parsed) && parsed > 0 && parsed < 65536)
      return parsed
  }
  return undefined
}

function devPublicUrl() {
  const raw = process.env.VITE_HMR_ORIGIN || process.env.BETTER_AUTH_URL || process.env.NUXT_PUBLIC_SITE_URL
  if (!raw)
    return undefined

  try {
    return new URL(raw)
  }
  catch {
    return undefined
  }
}

function devHmrConfig() {
  const publicUrl = devPublicUrl()
  const hmrHost = process.env.VITE_HMR_HOST || process.env.NUXT_HMR_HOST || publicUrl?.hostname
  const hmrProtocol = process.env.VITE_HMR_PROTOCOL || process.env.NUXT_HMR_PROTOCOL
  const serverPort = devPort(process.env.VITE_HMR_PORT || process.env.NUXT_HMR_PORT)
  const clientPort = devPort(process.env.VITE_HMR_CLIENT_PORT || process.env.NUXT_HMR_CLIENT_PORT)

  return {
    ...(hmrProtocol ? { protocol: hmrProtocol } : publicUrl?.protocol === 'https:' ? { protocol: 'wss' } : {}),
    ...(hmrHost && !hmrHost.includes('*') ? { host: hmrHost } : {}),
    ...(serverPort ? { port: serverPort } : {}),
    ...(clientPort ? { clientPort } : publicUrl?.protocol === 'https:' ? { clientPort: 443 } : {}),
  }
}

export default defineNuxtConfig({
  extends: ['@kurark/layer'],
  compatibilityDate: '2026-05-19',
  css: ['~/assets/css/app.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
    ],
  },
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME ?? 'Kurark Template',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME ?? process.env.NUXT_PUBLIC_APP_NAME ?? 'Kurark Template',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.BETTER_AUTH_URL ?? '',
      indexable: process.env.NUXT_PUBLIC_INDEXABLE ?? 'false',
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID ?? '',
    },
  },
  typescript: {
    strict: true,
  },
  vite: {
    server: {
      allowedHosts: devAllowedHosts(),
      hmr: devHmrConfig(),
    },
  },
})
