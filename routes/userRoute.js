const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

const router = express.Router()

//routers
//POST login
router.post('/login', loginController)

//reg user
router.post('/register',registerController)


module.exports = router