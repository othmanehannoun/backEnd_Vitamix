const Category = require('../models/Category')

const multer = require('multer')
const mime = require('mime-types')

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

exports.addCategory = (req, res) => {
    const category = new Category({
        ...req.body,
        img: req.file.path,
    })

    category.save((err, category) => {
        if(err) {
            return res.status('400').json({error: err})
        }
        res.send(category)
    })
}

exports.getAllCategory = (req, res) => {
    Category.find({}).exec((err, category) => {
        if(err) {
            return res.status('400').json({error: err})
        }
        res.send(category)
    })
}
