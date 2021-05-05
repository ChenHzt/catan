const { User } = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);

        await newUser.save();
        const token = await newUser.generateAuthToken()

        res.status(201).send({newUser,token});
    }
    catch (e) {
        res.status(400).send(e);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

const getUserLoggedIn = async (req, res) => {
    res.send(req.user)
}

module.exports = {
    createUser,
    login,
    logout,
    getUserLoggedIn
    
}
