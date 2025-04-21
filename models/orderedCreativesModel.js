const mongoose = require("mongoose");
const validator = require("validator");

const orderedCreativesSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    refNumber: {
      type: String,
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    transaction: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "Creator",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },    
    
    creativeType:{
      type:String,
      enum:["video","audio","video-hook","audio-hook"]
    },    
    
    
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "send-for-review",
        "make-modifications",
        "ready-for-use",
        ],
    },
    
   slug: {
      type: String,
      default: null,
    }, 
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    dateModified: {
      type: Date,
      default: Date.now,
    },
 
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "transaction",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brand",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
  });
  next();
});

const OrderCreatives = mongoose.model("OrderCreatives", orderedCreativesSchema);

module.exports = OrderCreatives;
