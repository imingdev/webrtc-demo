module.exports = {
  'src/**/*.{js,jsx}': (filenames) => [`eslint ${filenames.join(' ')}`],
  'src/**/*.{css,scss}': (filenames) => [`stylelint ${filenames.join(' ')}`],
};
