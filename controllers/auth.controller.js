
const { validationResult } = require('express-validator')
const { authService } = require('../services')

exports.signUp = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    try {
        let { login, password } = req.body
        let userId = await authService.signUp(login, password)
        return res.send({ id: userId })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.signIn = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() 
        })
    }
    try {
        let { login, password } = req.body
        let user = await authService.signIn(login, password)
        if (!user) return res.status(404).send({ message: 'User Not found.' })
        if (!user.accessToken) return res.status(401).send({ accessToken: null,	message: 'Invalid Password!' })
        res.send(user)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
