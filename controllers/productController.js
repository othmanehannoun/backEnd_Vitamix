const Product = require('../models/Product')

const multer = require('multer')
const mime = require('mime-types')

const mongoose = require("mongoose");

const storageFiles = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/");
	},
	filename: (req, file, cb) => {
        let ext = mime.extension(file.mimetype);
		cb(null, file.fieldname + '-' + Date.now() + "." + ext);
	}
});

exports.storageFile = multer({storage: storageFiles}).single('productImg')

exports.addProduct = (req, res) => {
    const product = req.file ? new Product({...req.body,img: req.file.path})  : new Product({...req.body})

    product.save((err, product) => {
        if(err)
            return res.status('400').json({error: err})
        res.send(product)
    })
}

exports.getAllProducts = (req, res) => {
    Product.find({}).exec((err, product) => {
        if(err)
            return res.status('400').json({error: err})
        res.send(product)
    })
}

exports.getOneProductDetails = (req, res) => {
    Product.findOne({_id: req.params.productID}).populate('category subCategory').exec((err, product) => {
        if(err)
            return res.status('400').json({error: err})
        res.send(product)
    })
}

exports.getProductByCategory = (req, res) => {
    Product.find({category: mongoose.Types.ObjectId(req.params.productID)}).populate('category').exec((err, product) => {
        if(err)
            return res.status('400').json({error: err})
        res.send(product)
    })
    
}

exports.getProductBySubCategory = (req, res) => {
    Product.find({subCategory: mongoose.Types.ObjectId(req.params.subCategoryID)}).populate('category subCategory').exec((err, product) => {
        if(err)
            return res.status('400').json({error: err})
        res.send(product)
    })
}

