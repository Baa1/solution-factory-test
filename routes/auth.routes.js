const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')
const { verifySignUp } = require('../middlewares')
const { check } = require('express-validator')

router.post(
    '/signup', 
    check('login', 'Поле login обязательно для заполнения').notEmpty(),
    check('password', 'Поле password обязательно для заполнения').notEmpty(),
    check('login', 'Поле login не должно превышать 20 символов').isLength({ max: 20 }),
    check('password', 'Поле password не должно превышать 20 символов').isLength({ max: 20 }),
    [verifySignUp.checkDuplicateLogin], 
    controller.signUp
)

router.post('/signin', controller.signIn)

module.exports = router
