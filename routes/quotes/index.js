'use strict';

const fetch = require('node-fetch');
const q = require('../../models/quotes_data.js');
let quotes = {};

/**
 * read JSON data from url
 * @param {string} url
 * @returns {Object}
 */
async function readJson(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    console.log('error');
  }
}

/**
 * random an integer number [min, max]
 * @param {number} min
 * @param {number} max
 * @returns {number} randomized integer number
 */
function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * sample (without replacement) ตัวเลข [min, max] จำนวน k ตัว
 * @param {number} min
 * @param {number} max
 * @param {number} k จำนวนครั้ง
 * @returns {Array} array ของตัวเลขที่ได้จากการสุ่ม
 */
function sampleBetween(min, max, k = 3) {
  const results = new Set();
  while (results.size !== k) {
    results.add(randBetween(min, max));
  }
  return Array.from(results);
}

/**
 * random a quote
 * @param {string} quotes
 * @param {string} relation
 * @returns {string} quote
 */
function randomQuote(quotes, relation = 'friend') {
  return quotes[relation][randBetween(0, quotes[relation].length - 1)];
}

async function readQuotes() {
  quotes = q.quotes; // read from local (data/quotes_data.js)
  
  // adapted from: https://github.com/itriplek/birthday-quotes-with-relationships/blob/master/birthday-quotes-with-relationship-formatted.json
  // quotes = await readJson('https://raw.githubusercontent.com/prasertcbs/basic-dataset/master/birthday_quotes.json');
  
  // console.log(quotes['wife']);
  // console.log(Object.keys(quotes));
  // for (let i = 0; i < 5; i++) {
  //   console.log(randomQuote(quotes, 'wife'));
  // }
  console.log(new Date());
}

readQuotes();

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // return 'random birthday quote';
    // return quotes
    let relations = Object.keys(quotes);
    let relation = relations[randBetween(0, relations.length - 1)];
    return { relation: relation, quote: randomQuote(quotes, relation) };
  });

  fastify.get('/relations', async function (request, reply) {
    return Object.keys(quotes).sort();
  });

  fastify.get('/:relation', async function (request, reply) {
    console.log(request.params.relation);
    console.log(request.query.limit);
    let relation = request.params.relation;
    let len = quotes[relation].length;
    let qs = [];
    let limit = 1;
    if (request.query.limit) {
      limit = +request.query.limit;
    }
    let ns = sampleBetween(0, len - 1, limit);
    console.log(ns);
    ns.forEach((idx) => {
      let q = quotes[relation][idx];
      qs.push(q);
    });
    return qs;
  });
};
