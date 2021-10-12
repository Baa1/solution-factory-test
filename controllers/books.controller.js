const client = require('../db')

exports.create = async (req, res) => {
    try {
        let { title, date, author, description, image } = req.body
        let params = [title, date, author, description, image]
        console.log(params)
        let result = (await client.query('INSERT INTO books (title, date, author, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *', params))
        return res.send({ book: result.rows[0] })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.getAll = async (req, res) => {
    try {
        let { groupby, orderby, limit, offset } = req.query
        let query = ''
        if (groupby) {
            query = `SELECT ${groupby}, COUNT(${groupby}) FROM books GROUP BY ${groupby}`
        } else {
            query = 'SELECT * FROM books'
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
        let books = (await client.query(query)).rows
        return res.send(books)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.update = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
