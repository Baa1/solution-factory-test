const express = require('express')
const router = express.Router()
const { authJwt } = require('../middlewares')
const { booksController } = require('../controllers')
const { check } = require('express-validator')

router.post(
    '/book', 
    check('title', 'Поле title обязательно для заполнения').notEmpty(),
    check('title', 'Поле title не должно превышать 200 символов').isLength({ max: 200 }),
    check('description', 'Поле description не должно превышать 500 символов').isLength({ max: 500 }),
    check('date', 'Значение даты должно удовлетворять формату YYYY-MM-DD').isDate({format: 'YYYY-MM-DD'}),
    check('author', 'Поле author должно быть положительным целым числом').isInt({ gt: 0 }),
    check('image', 'Поле image должно быть положительным целым числом').isInt({ gt: 0 }),
    [authJwt.verifyToken], 
    booksController.create
)

router.get(
    '/books', 
    [authJwt.verifyToken], 
    booksController.getAll
)

router.put(
    '/book/:id', 
    check('title', 'Поле title обязательно для заполнения').notEmpty(), 
    check('title', 'Поле title не должно превышать 200 символов').isLength({ max: 200 }),
    check('description', 'Поле description не должно превышать 500 символов').isLength({ max: 500 }),
    check('date', 'Значение даты должно удовлетворять формату YYYY-MM-DD').isDate({format: 'YYYY-MM-DD'}),
    check('author', 'Поле author должно быть положительным целым числом').isInt({ gt: 0 }),
    check('image', 'Поле image должно быть положительным целым числом').isInt({ gt: 0 }),
    [authJwt.verifyToken], 
    booksController.update
)

module.exports = router
