const express = require('express')
const router = express.Router()
const { authJwt } = require('../middlewares')
const controller = require('../controllers/books.controller')

router.post('/', [authJwt.verifyToken], controller.create)

router.get('/', [authJwt.verifyToken], controller.getAll)

router.put('/', [authJwt.verifyToken], controller.update)

module.exports = router
