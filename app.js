'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  });
  fastify.get('/home', function (req, reply) {
    return reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'index.html') directly
  });
  fastify.get('/about', function (req, reply) {
    return reply.sendFile('about.html'); 
  });
  
  fastify.get('/plain', function (req, reply) {
    return reply.sendFile('plain.html');
  });
  
  // Do not touch the following lines
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  //  fastify.register(AutoLoad, {
  //    root: path.join(__dirname, 'public'),
  //    prefix: '/public/',
  //    options: Object.assign({}, opts),
  //  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
