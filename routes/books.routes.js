const express = require('express')
const router = express.Router()
const { authJwt } = require('../middlewares')
const controller = require('../controllers/books.controller')
const { check } = require('express-validator')

router.post(
    '/', 
    check('title', 'Поле title обязательно для заполнения').notEmpty(),
    [authJwt.verifyToken], 
    controller.create
)

router.get('/', [authJwt.verifyToken], controller.getAll)

router.put(
    '/', 
    check('title', 'Поле title обязательно для заполнения').notEmpty(), 
    [authJwt.verifyToken], 
    controller.update
)

module.exports = router
