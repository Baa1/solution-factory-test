const client = require('../db')

checkDuplicateLogin = async (req, res, next) => {
    try {
        let { login } = req.body
        let user = (await client.query('SELECT id FROM users WHERE login = $1', [login]))
        if (user.rows && user.rows.length === 1 && user.rows[0].id > 0) {
            return res.status(400).send({ message: 'Failed! Login is already in use!' })
        }
        next()
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const verifySignUp = {
    checkDuplicateLogin
}

module.exports = verifySignUp
