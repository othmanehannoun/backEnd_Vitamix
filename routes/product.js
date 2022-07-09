const express = require('express')
const router = express.Router()
const {storageFile, addProduct, getAllProducts, getOneProductDetails, getProductByCategory, getProductBySubCategory} = require('../controllers/productController')
const {checkProductIsExist, requiredProductsFields} = require('../middllwars/formValidator')

router.post('/add', storageFile, checkProductIsExist, requiredProductsFields, addProduct)
router.get('/getAll', getAllProducts)
router.get('/getOne/:productID', getOneProductDetails)
router.get('/getProductByCategory/:productID', getProductByCategory)
router.get('/getProductBySubCategory/:subCategoryID', getProductBySubCategory)

module.exports = router
