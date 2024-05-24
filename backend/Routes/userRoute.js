const express = require('express')
const { userRegister, login, signOut, forgetPwd, resetPwd } = require('../Controllers/userController')
const router = express.Router()

router.post('/userRegister', userRegister)
router.post('/login', login)
router.post('/signout', signOut)
router.post('/forgetpwd', forgetPwd)
router.put('/resetpassword/:token', resetPwd)

module.exports = router