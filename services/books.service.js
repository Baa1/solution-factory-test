const pool = require('../db')

class BookService {
    create()  {
        return { message: 'create' }
    }
    getAll() {
        return { message: 'getAll' }
    }
    update() {
        return { message: 'update' }
    }
}

module.exports = new BookService()
