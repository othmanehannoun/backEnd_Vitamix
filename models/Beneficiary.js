const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    id_user_beneficiary: {
      type: String,
      required: true,
    },

    username_Beneficiary: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
