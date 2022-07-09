const SubCategory = require('../models/SubCategory')

exports.addSubCategory = (req, res) => {
    const subCategory = new SubCategory(req.body)

    subCategory.save((err, subCategory) => {
        if(err) {
            return res.status('400').json({error: err})
        }

        res.send(subCategory)
    })
}

exports.getAllSubCategory = (req, res) => {
    SubCategory.find({}).exec((err, subCategory) => {
        if(err) {
            return res.status('400').json({error: err})
        }

        res.send(subCategory)
    })
}

exports.getAllSubCategoryFromOneCategory = (req, res) => {
    SubCategory.find({fromCategory: req.params.subCID}).select('name').exec((err, subCategory) => {
        if(err) {
            return res.status('400').json({error: err})
        }

        res.send(subCategory)
    })
}
