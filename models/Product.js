const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: ObjectId,
        ref: 'SubCategory'
    },
    img: {
        type: String,
        default: "none"
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)
