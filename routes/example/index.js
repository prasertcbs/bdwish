'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/fortune', async function (request, reply) {
    return 'this is a fortune stick'
  })
}
