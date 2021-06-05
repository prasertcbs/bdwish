const quoteCtrl = require('../../controllers/quote2.js');
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let relation = quoteCtrl.randomRelation(); // relations[quoteCtrl.randBetween(0, relations.length - 1)];
    return { relation: relation, quote: quoteCtrl.randomQuote(relation) };
  });

  fastify.get('/relations', async function (request, reply) {
    return quoteCtrl.getRelations().sort();
  });

  fastify.get('/:relation', async function (request, reply) {
    console.log(request.params.relation);
    console.log(request.query.limit);
    let relation = request.params.relation;
    if (request.query.limit) {
      limit = +request.query.limit;
    } else {
      limit = 1;
    }
    return quoteCtrl.sampleQuotesFromRelation(relation, limit);
  });
};
