const express = require('express')
const router = express.Router()
const {addOrder, getOrderByUserId, getOneOrder} = require('../controllers/OrderController')


router.post('/add', addOrder)
// router.get('/getAll', getAllSubCategory)
router.get('/findUserOrder/:userId', getOrderByUserId)
router.get('/findOrder/:id', getOneOrder)

module.exports = router
