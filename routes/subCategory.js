const express = require('express')
const router = express.Router()
const {addSubCategory, getAllSubCategory, getAllSubCategoryFromOneCategory} = require('../controllers/subCategoryController')
const {checkSubCategoryIsExist} = require('../middllwars/formValidator')

router.post('/add', checkSubCategoryIsExist, addSubCategory)
router.get('/getAll', getAllSubCategory)
router.get('/getSubC/:subCID', getAllSubCategoryFromOneCategory)

module.exports = router
