const client = require('../db')
const { validationResult } = require('express-validator')
const { booksService } = require('../services')

exports.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    try {
        let { title, date, author, description, image } = req.body
        let params = [title, new Date(date), author, description, image]
        let book = await booksService.create(params)
        return res.send(book)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.get = async (req, res) => {
    try {
        // let { groupby, orderby, limit, offset } = req.query
        // let query = ''
        // if (groupby) {
        //     query = `SELECT ${groupby}, COUNT(${groupby})::integer FROM books GROUP BY ${groupby}`
        // } else {
        //     query = 'SELECT b.id, b.title, b.date, b.description, aut.name, aut.surname, aut.patronymic, img.filename, img.ext FROM books AS b' + 
        //     ' LEFT JOIN authors AS aut ON b.author = aut.id' +
        //     ' LEFT JOIN images AS img ON b.image = img.id'
        // }
        // if (orderby) {
        //     query += ` ORDER BY ${orderby}`
        // }
        // if (limit) {
        //     query += ` LIMIT ${limit}`
        // }
        // if (offset) {
        //     query += ` OFFSET ${offset}`
        // }
        // let books = (await client.query(query)).rows
        // return res.send(books)
        return res.send(booksService.get())
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    try {
        let id = req.params.id
        let { title, date, author, description, image } = req.body
        let params = [title, new Date(date), author, description, image, id]
        let book = await booksService.update(params)
        return res.send(book)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
