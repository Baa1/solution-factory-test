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
        let { groupby, orderby, limit, offset } = req.query
        if (typeof limit === 'object' || typeof offset === 'object' || typeof groupby === 'object' ||typeof orderby === 'object') {
            return res.status(400).send({ message: 'Wrong query format' })
        }
        if (groupby && orderby && groupby !== orderby) return res.status(400).send({ message: 'Wrong query format' })
        if (limit && limit < 0) return res.status(400).send({ message: 'Limit cannot be less, than 0' })
        if (offset && offset < 0) return res.status(400).send({ message: 'Offset cannot be less, than 0' })
        let params = { groupby, orderby, limit, offset }
        let result = await booksService.get(params)
        if (result && result.error) return res.status(400).send({ message: result.error })
        return res.send(result)
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
