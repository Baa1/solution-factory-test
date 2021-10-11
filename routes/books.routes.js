const express = require('express')
const router = express.Router()
const controller = require('../controllers/books.controller')

router.post('/', controller.create)

router.get('/', controller.getAll)

router.put('/', controller.update)

module.exports = router
