'use strict';

// Read the .env file.
require('dotenv').config();

// Require the framework
const Fastify = require('fastify');

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace');

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
const appService = require('./app.js');
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err);
  }
  await app.close();
});

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
// fix fastify with heroku
// ref: https://stackoverflow.com/questions/65997092/nodejs-fastify-crash-heruku-api
app.listen(process.env.PORT, '0.0.0.0', (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
// app.listen(process.env.PORT || 3000, (err) => {
//   if (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// });
