const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const client = require('./db')
const { stringGenerator, dateGenerator, intGenerator } = require('./common/ulils')

const authRouter = require('./routes/auth.routes')
const booksRouter = require('./routes/books.routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/auth', authRouter)
app.use('/api/books', booksRouter)

let authorIds = []
let imageIds = []

async function generateAuthors() {
    try {
        await client.query('DELETE FROM authors')
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
        await client.query('DELETE FROM images')
        for (let i = 0; i < 50; i++) {
            let filename = stringGenerator(intGenerator(200))
            let ext = extArr[intGenerator(extArr.length)]
            imageIds.push((await client.query('INSERT INTO images (filename, ext) VALUES ($1, $2) RETURNING id', [filename,  ext])).rows[0].id)
        }
    } catch (error) {
        console.log(error.message)
    }
}

function generateBooks() {

}

async function init() {
    await generateAuthors()
    console.log(authorIds)
    await generateImages()
    console.log(imageIds)
    await generateBooks()
}

init()

module.exports = app
