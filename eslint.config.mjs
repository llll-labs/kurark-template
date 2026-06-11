import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'drizzle/**',
  ],
  stylistic: {
    quotes: 'single',
  },
  vue: true,
}, {
  rules: {
    'node/prefer-global/process': 'off',
    'style/quotes': ['error', 'single', { avoidEscape: true }],
  },
})
