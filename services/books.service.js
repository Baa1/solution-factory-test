const pool = require('../db')

class BookService {
    fields = ['title', 'date', 'author', 'description', 'image']
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
    async get(params) {
        let client = await pool.connect()
        try {
            let { groupby, orderby, limit, offset } = params
            console.log()
            if (groupby && !this.fields.includes(groupby)) {
                return { error: `Поле ${groupby} не существует в теблице books` }
            }
            if (orderby && !this.fields.includes(orderby)) {
                return { error: `Поле ${orderby} не существует в теблице books` }
            }
            let query = ''
            if (groupby) {
                query = `SELECT ${groupby}, COUNT(${groupby})::integer FROM books GROUP BY ${groupby}`
            } else {
                query = 'SELECT b.id, b.title, b.date, b.description, aut.name, aut.surname, aut.patronymic, img.filename, img.ext FROM books AS b' + 
                ' LEFT JOIN authors AS aut ON b.author = aut.id' +
                ' LEFT JOIN images AS img ON b.image = img.id'
            }
            if (orderby) {
                query += ` ORDER BY ${orderby}`
            }
            if (limit) {
                query += ` LIMIT ${limit}`
            }
            if (offset) {
                query += ` OFFSET ${offset}`
            }
            let result = await client.query(query)
            return result.rows
        } catch (error) {
            throw error
        } finally {
            client.release()
        }
        
    }
    async update(params) {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')
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
