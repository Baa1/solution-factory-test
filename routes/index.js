const authRouter = require('./auth.routes')
const booksRouter = require('./books.routes')

module.exports = app => {
    app.use('/api', authRouter)
    app.use('/api', booksRouter)
}
