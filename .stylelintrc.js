module.exports = {
  plugins: [
    'stylelint-order',
  ],
  extends: [
    'stylelint-config-standard-scss',
    'css-properties-sorting',
  ],
  rules: {
    'selector-list-comma-newline-after': null,
    'declaration-colon-newline-after': null,
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'selector-pseudo-element-no-unknown': null,
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'value-keyword-case': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/at-mixin-pattern': null,
  },
};