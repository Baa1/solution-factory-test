const pool = require('../db')

class BookService {
    async create(params)  {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')
            let result = await client.query('INSERT INTO books (title, date, author, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *', params)
            if (result.rows && result.rows.length === 1) {
                await client.query('COMMIT')
                return result.rows[0]
            }
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }
    async get() {
        return { message: 'getAll' }
    }
    async update(params) {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')
            console.log(params)
            let result = await client.query('UPDATE books SET title = $1, date = $2, author = $3, description = $4, image = $5 WHERE id = $6 RETURNING *', params)
            if (result.rows && result.rows.length === 1) {
                await client.query('COMMIT')
                return result.rows[0]
            }
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }
}

module.exports = new BookService()
