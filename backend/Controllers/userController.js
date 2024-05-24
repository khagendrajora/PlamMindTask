const User = require('../Models/user')
const sendEmail = require('../utils/setEmail')
const Token = require('../Models/tokenModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret = "hello"
const crypto = require('crypto')
const { expressjwt } = require('express-jwt')

exports.userRegister = async (req, res) => {
    let user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })

    User.findOne({ email: user.email })
        .then(async data => {
            if (data) {
                return res.status(400).json({ error: 'Used email' })
            }
            else {
                user = await user.save()
                if (!user) {
                    return res.status(400).json({ error: 'not uploaded' })
                }
                return (res.send(user))
            }

        }).catch(err => {
            return res.status(400).json({ error: err })
        })

}


//login 

exports.login = async (req, res) => {
    let email = req.body.email
    try {
        let userData = await User.findOne({ email })
        if (!userData) {
            return res.status(400).json({ error: 'Invalid Email' })
        }
        const data = {
            user: {
                id: userData.id

            }
        }
        const authToken = jwt.sign({ data }, jwtSecret)
        if (req.body.password == userData.password) {
            return (
                res.json({
                    authToken: authToken,
                    id: userData._id,
                    email: userData.email,
                    userName: userData.userName

                }
                ))
        }
        else {
            return res.status(400).json({ error: 'invalid password' })
        }


    } catch (error) {
        console.log(error, "Provide valid information")

    }
}

exports.signOut = (req, res) => {
    res.clearCookie('myCookie')
    res.json({ message: 'Signed out Successfully' })
}


exports.forgetPwd = async (req, res) => {
    let email = req.body.email
    User.findOne({ email })
        .then(async data => {
            if (!data) {
                return res.status(400).json({ error: "email not found" })

            }
            let token = new Token({
                token: crypto.randomBytes(16).toString('hex'),
                userId: data._id
            })
            token = await token.save()
            if (!token) {
                res.status(400).json({ error: 'token not generated' })
            }
            // const url = process.env.FRONTEND_URL + '\/resetpassword\/' + token.token
            sendEmail({
                from: 'no-reply@PlamMind.com',
                to: data.email,
                subject: "Password reset link",
                text: `hello \n your password reset link is \n
                http://${req.headers.host}/api/resetpassword/${token.token}`,
            })

        },
            res.json({ message: "reset link has been send to your email" })
        ).catch(err => {
            return res.status(400).json({ err: 'failed' })
        })

}


//reset password
exports.resetPwd = async (req, res) => {
    Token.findOne({ token: req.params.token })
        .then(data => {
            if (!data) {
                return res.status(400).json({ error: "token not found" })
            }
            User.findOne({ _id: data.userId })
                .then(async id => {
                    if (!id) {
                        return res.status(400).json({ error: "invalid email for given token" })
                    } else {

                        id.password = req.body.password
                        id.save()
                        res.json({ message: 'password  has been reset' })
                    }
                })
                .catch(err => {
                    return res.status(400).json({ error: "email and token not matched" })
                })


        }).catch(err => {
            return res.status(400).json({ error: "token not found" })
        })
}


