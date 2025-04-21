const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    
        
    platformRate:{
      type:Number
    },
    minimumPlatformCharge:{
      type:Number
    },
    vat:{
      type:Number
    },
    platformRateIsIncludedAsPartOfUserInputedAmount:{
      type:Boolean,
      default:true,
      enum:[false, true]
    },
    vatIsIncludedAsPartOfUserInputedAmount:{
      type:Boolean,
      default:true,
      enum:[false, true]
    }

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
