const pool = require('../db')
const bcrypt = require('bcryptjs')

class AuthService {
    async signUp(login, password) {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')
            let result = await client.query('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING id', [login, bcrypt.hashSync(password, 8)])
            if (result.rows && result.rows.length === 1) return result.rows[0].id
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }
    signIn(login, password) {

    }
}

module.exports = new AuthService()
