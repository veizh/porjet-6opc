const express = require ('express')
const router = express.Router()
const userControls = require('../controllers/user')
const auth =require('../middleware/auth')

router.post('/signup',userControls.signup)

router.post('/login',userControls.login)


module.exports = router