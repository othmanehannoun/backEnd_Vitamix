const express = require('express')
const router = express.Router()
const {storageFile, addCategory, getAllCategory} = require('../controllers/categoryController')
const {checkCategoryIsExist} = require('../middllwars/formValidator')

router.post('/add', storageFile, checkCategoryIsExist, addCategory)
router.get('/getAll', getAllCategory)

module.exports = router
