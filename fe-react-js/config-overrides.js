/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
  // enable babel in webpack
  useBabelRc(),
);
