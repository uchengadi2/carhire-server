const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "Creator",
    },
    brand:{
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    brandName:{
      type:String,
    },
    brandCountry:{
      type: mongoose.Schema.ObjectId, 
      ref: "Country",
    },        

    project:{
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
    creativeType:{
      type:String,
      default:"video",
      enum:["video","audio"]
    },
    creativeLanguage:{
      type: mongoose.Schema.ObjectId,
      ref: "Language",
    },
    creativeQuantity: {
      type: Number,
    },
    creativeHookQuantity: {
      type: Number,
    },
    creativeUnitPrice: {
      type: Number,
    },
    creativeHookUnitPrice: {
      type: Number,
    },
    createiveDeliveryDays: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    currency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },
    currencyName: {
      type: String,
    },
    refNumber: {
      type: String,
    },
    cartHolder: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    dateAddedToCart: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "unmarked-for-checkout",
      enum: ["unmarked-for-checkout", "marked-for-checkout", "checkedout"],
    },
    
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    creatorCategoryCode:{
      type:String,
    },
    creatorCategoryName:{
      type:String,
    },
    grandTotal: {
      type: Number,
    },
    

    slug: {
      type: String,
    },
    creatorImage: {
      type: String,
    },
    
   
 
    
  },

  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creativeLanguage",
  });
  next();
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currency",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
