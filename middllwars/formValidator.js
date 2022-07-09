const Category = require('../models/Category')
const Product = require('../models/Product')
const SubCategory = require('../models/SubCategory')

exports.SignUpValidator = (req, res, next) => {
    req.check('email', 'Veuillez entrer votre Email').notEmpty().isEmail().withMessage('Veuilez entrer une adress e-mail correcte')
    req.check('password', 'Veuillez entrer votre mot de passe').notEmpty()

    const errors = req.validationErrors()

    if(errors) {
        return res.status(400).json({error: errors[0].msg})
    }
    next()
}

exports.checkCategoryIsExist = (req, res, next) => {
    Category.countDocuments({name: req.body.name}).exec((err, category) => {
        if(err)
            return res.status(400).json({error: err})

        else if(parseInt(category) >= 1)
            return res.status(400).json({error: "cette category et déjà existé"})

        next()
    })
}

exports.requiredProductsFields = (req, res, next) => {
    req.check('price', 'Veuillez entrer votre prix').notEmpty().isNumeric().withMessage('Veuilez entrer une prix correcte')

    const errors = req.validationErrors()

    if(errors) {
        return res.status(400).json({error: errors[0].msg})
    }
    next()
}

exports.checkProductIsExist = (req, res, next) => {
    Product.countDocuments({name: req.body.name}).exec((err, product) => {
        if(err)
            return res.status(400).json({error: err})

        else if(parseInt(product) >= 1)
            return res.status(400).json({error: "cette produit et déjà existé"})

        next()
    })
}

exports.checkSubCategoryIsExist = (req, res, next) => {
    SubCategory.countDocuments({name: req.body.name, fromCategory: req.body.fromCategory}).exec((err, product) => {
        if(err)
            return res.status(400).json({error: err})

        else if(parseInt(product) >= 1)
            return res.status(400).json({error: "cette sous category et déjà existé"})

        next()
    })
}
