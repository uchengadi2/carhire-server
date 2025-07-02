const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      //required: true,
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
   creator: {
         type: mongoose.Schema.ObjectId,
         ref: "Creator",
       },
      
       
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
       user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
       dateAddedToCart: {
        type: Date,
        default: Date.now,
      },
   
       status: {
         type: String,
         default: "pending",
         enum: ["pending", "processed"],
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
         default:1
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
    name:{
      type:String,
      default:null
    },
    phoneNumber:{
      type:String,
      default:null
    },
    emailAddress:{
      type:String,
      default:null
    },
    businessName:{
      type:String,
      default:null
    },
    bookedDate: {
      type: Date,
      default: Date.now,
    },
    bookedBy:[
      {
        type: mongoose.Schema.ObjectId,
      ref: "User",
      }
    ],
    numberOfGuest:{
      type:Number,
      default:0
    },
    packageCostPerPerson:{
      type:Number,
      default:0
    },
    numberOfVehicleRequired:{
      type:Number,
      default:0
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
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
  
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sourceLocation",
  });
  next();
});
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sourceState",
  });
  next();
});
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "destinationState",
  });
  next();
});
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "vehicle",
  });
  next();
});





const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
