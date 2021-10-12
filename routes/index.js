const authRouter = require('./auth.routes')
const booksRouter = require('./books.routes')

module.exports = app => {
    app.use('/api/auth', authRouter)
    app.use('/api/books', booksRouter)
}
