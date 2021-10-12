const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const client = require('./db')
const { stringGenerator, dateGenerator, intGenerator } = require('./common/ulils')


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const mountRoutes = require('./routes')

let authorIds = []
let imageIds = []

async function generateAuthors() {
    try {
        for (let i = 0; i < 50; i++) {
            let name = stringGenerator(intGenerator(50))
            let surname = stringGenerator(intGenerator(50))
            let patronymic = stringGenerator(intGenerator(50))
            authorIds.push((await client.query('INSERT INTO authors (surname, name, patronymic) VALUES ($1, $2, $3) RETURNING id', [surname,  name, patronymic])).rows[0].id)
        }
    } catch (error) {
        console.log(error.message)
    }   
}

async function generateImages() {
    let extArr = ['jpeg', 'png', 'svg']
    try {
        
        for (let i = 0; i < 50; i++) {
            let filename = stringGenerator(intGenerator(200))
            let ext = extArr[intGenerator(extArr.length)]
            imageIds.push((await client.query('INSERT INTO images (filename, ext) VALUES ($1, $2) RETURNING id', [filename,  ext])).rows[0].id)
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function generateBooks() {
    try {
        for (let i = 0; i < 100000; i++) {
            let title = stringGenerator(200)
            let date = dateGenerator('1900-01-01', '2021-12-31')
            let author = authorIds[intGenerator(authorIds.length)]
            let description = stringGenerator(500)
            let image = imageIds[intGenerator(imageIds.length)]
            let params = [title, date, author, description, image]
            await client.query('INSERT INTO books (title, date, author, description, image) VALUES ($1, $2, $3, $4, $5)', params)
        }
        console.log('Books added')
    } catch (error) {
        console.log(error.message)
    }
}

async function init() {
    let booksCount = (await client.query('SELECT COUNT(*) FROM books')).rows[0].count
    if (booksCount === 0) {
        await client.query('DELETE FROM books')
        await client.query('DELETE FROM images')
        await client.query('DELETE FROM authors')
        await generateAuthors()
        await generateImages()
        await generateBooks()
    }
}

init()

mountRoutes(app)

module.exports = app
