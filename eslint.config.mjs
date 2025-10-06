import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs } from 'eslint-plugin-import-x'
import globals from 'globals'
import { config, configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Constants

const PATTERN_JS = '**/*.{js,mjs,cjs}'
const PATTERN_TS = '**/*.{ts,mts,cts}'

const FILES_TS_ONLY = [PATTERN_TS]
const FILES_ALL = [PATTERN_JS, PATTERN_TS]

// Javascript Plugin

const configPluginJavascript = config({
  rules: ruleNormalizer()({
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    eqeqeq: 'smart',
  }),
  files: FILES_ALL,
  extends: [
    pluginJavascript.configs.recommended,
  ],
})

// Typescript Plugin

const typescriptPluginConfig = config({
  rules: ruleNormalizer({ plugin: '@typescript-eslint' })({
    'array-type': { default: 'array-simple', readonly: 'array-simple' },
    'restrict-template-expressions': 'off',
  }),
  files: FILES_TS_ONLY,
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
  extends: [
    pluginTypescriptConfigs.strictTypeChecked,
    pluginTypescriptConfigs.stylisticTypeChecked,
  ],
})

// Import Plugin

const configPluginImport = config({
  rules: ruleNormalizer({ plugin: 'import-x' })({
    'consistent-type-specifier-style': 'error',
    'no-useless-path-segments': 'error',
    'no-absolute-path': 'error',
    'no-cycle': 'error',
    'no-nodejs-modules': 'error',
  }),
  files: FILES_ALL,
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  extends: [
    flatConfigs.recommended,
    flatConfigs.typescript,
  ],
})

// Stylistic Plugin

const configPluginStylistic = config({
  rules: ruleNormalizer({ plugin: '@stylistic' })({
    quotes: 'single',
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'error',
    'padded-blocks': 'off',
  }),
  files: FILES_ALL,
  extends: [
    pluginStylistic.configs.customize({
      quotes: 'single',
      indent: 2,
      semi: false,
      arrowParens: true,
      quoteProps: 'as-needed',
      braceStyle: '1tbs',
      commaDangle: 'always-multiline',
      blockSpacing: true,
      jsx: false,
    }),
  ],
})

// Config

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  configPluginJavascript,
  configPluginImport,
  configPluginStylistic,
  typescriptPluginConfig,
)

// Helpers

function ruleNormalizer({ plugin: pluginName } = {}) {
  const normalizeRuleEntry = (entry) => {
    if (['error', 'off', 'warn'].includes(entry)) return entry
    if (Array.isArray(entry)) return entry
    return ['error', entry]
  }

  const createRulesNormalizer = (normalizeEntry) => (rules) => {
    const entries = Object.entries(rules)
    const entriesNormalized = entries.map(normalizeEntry)
    return Object.fromEntries(entriesNormalized)
  }

  if (!pluginName) {
    return createRulesNormalizer(
      ([ruleName, ruleEntry]) => [
        ruleName,
        normalizeRuleEntry(ruleEntry),
      ],
    )
  }

  const pluginPrefix = `${pluginName}/`

  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }

  return createRulesNormalizer(
    ([ruleName, ruleEntry]) => [
      normalizeRuleName(ruleName),
      normalizeRuleEntry(ruleEntry),
    ],
  )
}
