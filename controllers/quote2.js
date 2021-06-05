// for routes/quotes2
'use strict';
const { default: fastify } = require('fastify');
const fetch = require('node-fetch');
const q = require('../models/quotes_data.js');
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

function sampleQuotesFromRelation(relation, limit) {
  let lenRelations = relationQuotes(relation).length;
  let qs = [];
  let ns = sampleBetween(0, lenRelations - 1, limit);
  console.log(ns);
  ns.forEach((idx) => {
    let q = quoteRelation(relation, idx);
    qs.push(q);
  });
  return qs;
}

function randomRelation() {
  let relations = getRelations();
  return relations[randBetween(0, relations.length - 1)];
}

/**
 * get a quote from a given relation
 * @param {Array} relation
 * @param {number} idx
 * @returns
 */
function quoteRelation(relation, idx) {
  return quotes[relation][idx];
}

/**
 * random a quote
 * @param {string} quotes
 * @param {string} relation
 * @returns {string} quote
 */
function randomQuote(relation = 'friend') {
  return quotes[relation][randBetween(0, quotes[relation].length - 1)];
}

function getRelations() {
  return Object.keys(quotes);
}

function relationQuotes(relation) {
  return quotes[relation];
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

module.exports = {
  randomRelation,
  randomQuote,
  getRelations,
  sampleQuotesFromRelation,
};
