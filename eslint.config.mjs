import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs } from 'eslint-plugin-import-x'
import globals from 'globals'
import { config, configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Javascript Plugin

const rulesPluginJavascript = normalizeRules(null, {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'no-useless-concat': 'error',
  eqeqeq: 'smart',
})

const configPluginJavascript = config(
  pluginJavascript.configs.recommended,
  { rules: rulesPluginJavascript },
)

// Import Plugin

const rulesPluginImport = normalizeRules('import-x', {
  'consistent-type-specifier-style': 'error',
  'no-useless-path-segments': 'error',
  'no-absolute-path': 'error',
  'no-cycle': 'error',
  'no-nodejs-modules': 'error',
})

const configPluginImport = config(
  flatConfigs.recommended,
  flatConfigs.typescript,
  { rules: rulesPluginImport },
)

// Stylistic Plugin

const rulesPluginStylistic = normalizeRules('@stylistic', {
  quotes: 'single',
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'padded-blocks': 'off',
})

const configPluginStylistic = config(
  // Disable rule until @stylistic/eslint-plugin types are fixed
  // eslint-disable-next-line import-x/no-named-as-default-member
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
  { rules: rulesPluginStylistic },
)

// Typescript Plugin

const rulesPluginTypescript = normalizeRules('@typescript-eslint', {
  'array-type': { default: 'array-simple', readonly: 'array-simple' },
  'restrict-template-expressions': 'off',
})

const typescriptPluginConfig = config(
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } },
  pluginTypescriptConfigs.strictTypeChecked,
  pluginTypescriptConfigs.stylisticTypeChecked,
  { rules: rulesPluginTypescript },
)

const configDisableJavascriptTypeCheck = config({
  ...pluginTypescriptConfigs.disableTypeChecked,
  files: ['**/*.{js,mjs,cjs}'],
})

// Config

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  configPluginJavascript,
  configPluginImport,
  configPluginStylistic,
  typescriptPluginConfig,
  configDisableJavascriptTypeCheck,
)

// Helpers

function normalizeRules(pluginName, rules) {
  const entries = Object.entries(rules)
  const normalizeEntry = createEntryNormalizer(pluginName)
  const entriesNormalized = entries.map(normalizeEntry)
  return Object.fromEntries(entriesNormalized)
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)]
  const normalizeRuleName = createPluginRuleNameNormalizer(pluginName)
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)]
}

function createPluginRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }
}

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry
  if (['error', 'off', 'warn'].includes(entry)) return entry
  return ['error', entry]
}
