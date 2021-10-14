const { Pool } = require('pg')
const config = require('../database.json')

const pool = new Pool(config.dev)

module.exports = pool
