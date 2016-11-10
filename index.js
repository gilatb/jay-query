'use strict';

// Allow dependencies to be loaded on the server (leave at the top)
if (typeof window === 'undefined') {
  var _ = require('lodash');
}

function J$ (selector) {

}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = J$;
}
