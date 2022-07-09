const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fromCategory: {
      type: ObjectId,
      ref: 'Category'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
