const pool = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')

class AuthService {
    async signUp(login, password) {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')
            let result = await client.query('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING id', [login, bcrypt.hashSync(password, 8)])
            if (result.rows && result.rows.length === 1) {
                await client.query('COMMIT')
                return result.rows[0].id
            }
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            await client.release()
        }
    }
    async signIn(login, password) {
        let client = await pool.connect()
        try {
            let result = await client.query('SELECT id, login, password FROM users WHERE login = $1', [login])
            if (result.rows && result.rows.length === 0) return null
            let user = result.rows[0]
            const passwordIsValid = bcrypt.compareSync(password, user.password)
            if (!passwordIsValid) return { accessToken: null }
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            })
            return { id: user.id, login: user.login, accessToken: token }
        } catch (error) {
            throw error
        } finally {
            client.release()
        }
    }
}

module.exports = new AuthService()
