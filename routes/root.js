'use strict';
// add static pages here

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true, random: fastify.randBetween(1, 6) };
  });

  fastify.get('/home', function (req, reply) {
    return reply.sendFile('home.html'); // serving path.join(__dirname, 'public', 'index.html') directly
  });
  fastify.get('/about', function (req, reply) {
    return reply.sendFile('about.html');
  });

  fastify.get('/plain', function (req, reply) {
    return reply.sendFile('plain.html');
  });
};
