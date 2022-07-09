const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "/"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
