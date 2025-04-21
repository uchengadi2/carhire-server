const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
      required: true,
      unique: true,
    },
   
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },

    brand: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
      },
    ],
    creator: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Creator",
      },
    ],
    platformReceipt: {
      type: Number,
    },
    vatReceipt: {
      type: Number,
      default: 0,
    },
    creatorReceipt: {
      type: Number,
      default: 0,
    },
    
    paymentCurrency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },

    
    paymentConfirmedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    paymentConfirmedDate: {
      type: Date,
      default: Date.now,
    },

  
    paymentStatus: {
      type: String,
      enum: ["paid", "not-paid", "in-dispute"],
      default: "not-paid",
    },
    paymentMethod: {
      type: String,
      enum: ["bank-transfer", "mobile-money", "cash"],
    },
    prevailingPlatformRate: {
      type: Number,
    },
    prevailingMinimumPlatformRate: {  
        
        type: Number,
      },
      prevailingVatRate: {
        type: Number,
      },
      prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount: {
        type: Boolean,
        default: true,
        enum: [false, true],
      },
      prevailingVatRateIsIncludedAsPartOfUserInputedAmount: {
        type: Boolean,
        default: true,
        enum: [false, true],
      },
      sendForDisputeResolutionBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
      sentForDisputeResolutionDateDate: {
            type: Date,
          },
      markPaymentAsResolvedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
      markPaymentAsResolvedDate: {
            type: Date,
          },

    
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
  });
  next();
});

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brand",
  });
  next();
});
paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
  });
  next();
});

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "paymentConfirmedBy",
  });
  next();
});

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "paymentCurrency",
  });
  next();
});



const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
