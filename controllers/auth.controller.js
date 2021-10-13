const config = require('../config/auth.config')
const client = require('../db')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signUp = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    let { login, password } = req.body
    client.query('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING id', [login, bcrypt.hashSync(password, 8)])
    .then(result => {
        return res.send({ id: result.rows[0].id })
    })
    .catch(error => {
        return res.status(500).send({ message: error.message })
    })
}

exports.signIn = (req, res) => {
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
