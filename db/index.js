const { Client } = require('pg')
const config = require('../database.json')

const client = new Client(config.dev)

client.connect()

module.exports = client
