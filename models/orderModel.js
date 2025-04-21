const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    transactionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "Creator",
    },
    productCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
   
    quantityAdddedToCart: {
      type: Number,
      default:0,
    },
    orderedCreativeQuantity: {
      type: Number,
      default:0,
    },
    orderedHookQuantity: {
      type: Number,
      default:0,
    },
    
    orderedCreativePricePerUnit: {
      type: Number,
      default:0,
    },
    orderedHookPricePerUnit:{
      type:Number,
      default:0,
    },
    productCurrency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },  
    
    creativeType:{
      type:String,
      enum:["video","audio"]
    },
    
    totalProductCost: {
      type: Number,
      default:0,
    },
   
    recipientName: {
      type: String,
      default:null
    },
    recipientPhoneNumber: {
      type: String,
      default:null
    },
    recipientEmailAddress: {
      type: String,
      default:null
    },

    dateAddedToCart: {
      type: Date,
    },

    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      enum: ["to-be-confirmed", "paid", "not-processed"],
      default: "to-be-confirmed",
    },
    paymentMethod: {
      type: String,
      default: "audit",
      enum: ["audit", "card", "foreigner"],
    },
    status: {
      type: String,
      default: "creative-pending",
      enum: [
        "creative-pending",
        "creative-in-review",
        "creative-completed",
        "marked-for-payment", 
        "project-completed",
        ],
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    
   
      
   slug: {
      type: String,
      default: null,
    },
    
    brand: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
      },
    ],
    language: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Language",
      },
    ],
    creativeLanguage: {
      type:String,
      default:null
    },
    creativeDeliveryDays:{
      type: String,
    },
    image:{
      type:String,
    },
    
    creatorCategoryCode: {
      type: String,
    },
    brandCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    
    brandName: {
      type: String,
    },
    
    project: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
      },
    ],
    projectName: {
      type: String,
    },

    creatives: [
      {
        type: String,
        
      },
    ],

    hooks: [
      {
        type: String,
        
      },
    ],
    creativesYoutubeIds: [
      {
        type: String,
        
      },
    ],
    creativeHooksYoutubeIds: [
      {
        type: String,
        
      },
    ],
    image:{
      type:String
    },
    markForCompletionBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    markForPaymentBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    markForCompletionDate: {
      type: Date,
    },
    markForPaymentDate: {
      type: Date,
    },
    markedByIdentity: {
      type: String,
      enum: ["staff", "brand"],
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

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "language",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productCurrency",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brandCountry",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "transactionId",
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
    path: "productCategory",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "markForCompletionBy",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "markForPaymentBy",
  });
  next();
});



const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
