'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true, random: fastify.randBetween(1, 6) }
  })
}
