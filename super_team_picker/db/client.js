const knex = require('knex');
const config = require('../knexfile');

const environment = config.development;
const connection = knex(environment);
module.exports = connection;