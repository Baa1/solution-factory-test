const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
const { verifySignUp } = require('../middlewares')
const { check } = require('express-validator')

router.post(
    '/auth/signup', 
    check('login', 'Поле login обязательно для заполнения').notEmpty(),
    check('password', 'Поле password обязательно для заполнения').notEmpty(),
    check('login', 'Поле login не должно превышать 20 символов').isLength({ max: 20 }),
    check('password', 'Поле password не должно превышать 20 символов').isLength({ max: 20 }),
    [verifySignUp.checkDuplicateLogin], 
    authController.signUp
)

router.post(
    '/auth/signin', 
    check('login', 'Поле login обязательно для заполнения').notEmpty(),
    check('password', 'Поле password обязательно для заполнения').notEmpty(),
    check('login', 'Поле login не должно превышать 20 символов').isLength({ max: 20 }),
    check('password', 'Поле password не должно превышать 20 символов').isLength({ max: 20 }),
    authController.signIn
)

module.exports = router
