const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "Creator",
    },
    // brand:{
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Brand",
    // },
    
    isDeleted: {
      type: Boolean,
      default: false,
      enum: [false, true],
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

    vehicle: [
      {
      type: mongoose.Schema.ObjectId,
      ref: "CreatorSample",
      default:null
      }
    ],
   

    numberOfVehicleOccupant:{
      type:Number,
      default:0
    },

    service:[
      {
        type:String,
        enum:[
          "none",
          "carhire",
          "car-and-security",
          "vvip",
          "business-executive",
          "diplomatic",
          "family-group",
          "private-jet",
          "medical-emergency",
          "airline-crew",
          "addon-lounge-access",
          "addon-concierge",
          "addon-carhire",
          "addon-carhire-and-onsite-security",
          "addon-carhire-and-ontransit-security"

        ],
        default:"none"
      }
    ],

    sourceLocation:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "Location",
      }
      
    ],
    country:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      }
      
    ],

    sourceState:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "State",
      }
      
    ],
    destinationState:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "State",
      }
      
    ],
    destinationAddress:{
      type:String
    },
    arrivalDate:{
      type:Date
    },
    departureDate:{
      type:Date
    },
    tripCoverage:{
      type:String,
      default:"one-way",
      enum:["one-way","two-way"]
    },
    serviceApplicability:{
      type:String,
      default:"at-arrival",
      enum:["at-arrival","at-departure","both"]
    },

    onsiteSecurityServiceApplicability:{
      type:String,
      default:"not-applicable",
      enum:["not-applicable","at-arrival","at-departure","both"]
    },
    ontransitSecurityServiceApplicability:{
      type:String,
      default:"not-applicable",
      enum:["not-applicable","from-arrival","from-destination","both"]
    },
       
    ontransitSecurityService:{
      type:String,
      default:"not-applicable",
      enum:["not-applicable","yes","no"]

    },
    onsiteSecurityService:{
      type:String,
      default:"not-applicable",
      enum:["not-applicable","yes","no"]

    },
    carService:{
      type:String,
      default:"not-applicable",
      enum:["not-applicable","yes","no"]

    },

    slug: {
      type: String,
      default:null
    },
    
    category:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      }
      
    ],
    image:{
      type:String
    },
    packageCostPerPerson:{
      type:Number,
      default:0
    },
    numberOfGuest:{
      type:Number,
      default:0
    },

    numberOfVehicleRequired:{
      type:Number,
      default:1
    },
    requestedModel:{
      type:String,
      default:"any-model",
      enum: ["any-model","below-2010", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024","2025"]
    },
    comment:{
      type:String,
      default:null
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
    path: "brand",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sourceLocation",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "destinationLocation",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "vehicle",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sourceState",
  });
  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "destinationState",
  });
  next();
});




const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
