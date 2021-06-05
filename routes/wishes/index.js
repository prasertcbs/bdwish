const wishCtrl = require('../../controllers/wishes.js');
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let relation = wishCtrl.randomRelation();
    return { relation: relation, wish: wishCtrl.randomWish(relation) };
  });

  fastify.get('/relations', async function (request, reply) {
    return wishCtrl.getRelations().sort();
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
    return wishCtrl.sampleWishesFromRelation(relation, limit);
  });
};
