const config = require('../config/auth.config')
const client = require('../db')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { authService } = require('../services')

exports.signUp = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    try {
        let { login, password } = req.body
        let userId = await authService.signUp(login, password)
        return res.send({ id: userId })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.signIn = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    client.query('SELECT id, login, password FROM users WHERE login = $1', [req.body.login])
    .then(result => {
        if (result.rows.length === 0) return res.status(404).send({ message: 'User Not found.' })
        let user = result.rows[0]
        const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		)
        if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password!'
			})
		}
        const token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: config.jwtExpiration
		})
        return res.send({
            id: user.id,
            login: user.login,
            accessToken: token,
        })
    })
    .catch(error => {
        return res.status(500).send({ message: error.message })
    })
}
