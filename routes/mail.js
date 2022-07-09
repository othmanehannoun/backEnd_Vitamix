const express = require('express')
const router = express.Router()
const {sendEmailWithSG} = require('../controllers/sendMailController')

router.post('/sendMailWithSG', sendEmailWithSG)

module.exports = router
