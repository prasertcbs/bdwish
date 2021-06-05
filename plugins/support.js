'use strict';

const fp = require('fastify-plugin');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('someSupport', () => {
    return 'hugs';
  });
  fastify.decorate('randBetween', (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
});
