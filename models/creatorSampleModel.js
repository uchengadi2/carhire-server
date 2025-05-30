const mongoose = require("mongoose");

const creatorSampleSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
      
    },
    creator: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Creator",
        },
      ],
 
    youtubeId:{
      type:String,
      default:null,
    },
    vehicleClass:{
        type:String,
        enum:["economy","business","luxury","security-van","buses","motorcycle","trailer","truck"],
        default:"economy"
        
    },
    specialFeature:{
        type:String,
        default:"none",
        enum:["bullet-proof","fire-proof","water-proof","bomb-proof","none"],
        // enum:["bullet-proof","fire-proof","water-proof","bomb-proof"],
        default:"bullet-proof"
    },
  
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateModified: {
      type: Date,
      default: Date.now,
    },
     createdBy: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
        ],
        modifiedBy: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
        ],

        
      status:{
        type:String,
        default:"invisible",
        enum:["visible","invisible"]
      },
      isAllowedOnThePlatform:{
        type:Boolean,
        default:false,
        enum:[false,true]
      },
      approvedOrRejectedBy: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
      dateApprovedOrRejected:{
        type:Date
      },

      image: {
        type: String,
        required: [false, "Please provide the vehicle image cover"],
      },
  
      images: [
        {
          type: String,
        },
      ],
      driverDetails: {
        type: String,
      },
      vehicleDetails: {
        type: String,
      },
      vehicleDescription: {
        type: String,
      },
      location: [
            {
              type: mongoose.Schema.ObjectId,
              ref: "State",
            },
          ],
      
          maximumOccupants: {
            type: Number,
            default: 0,
          },
          sampleType: {
            type: String,
            enum: [
              "hatchback",
              "sedan",
              "suv",
              "pickup",
              "van",
              "bus",
              "truck",
              "motorcycle",
            ],
            default: "hatchback",
          },
          vehicleMake: {
            type: String,
            required: [true, "Please provide the vehicle make"],
          },
          vehicleModel: {
            type: String,
            required: [true, "Please provide the vehicle model"],
          },
      
          category: [
            {
              type: mongoose.Schema.ObjectId,
              ref: "Category",
            },
          ],
          slug:{
            type:String,
          },
     
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
creatorSampleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
  });
  next();
});

creatorSampleSchema.pre(/^find/, function (next) {
    this.populate({
      path: "creator",
    });
    next();
  });

  creatorSampleSchema.pre(/^find/, function (next) {
    this.populate({
      path: "location",
    });
    next();
  });

  creatorSampleSchema.pre(/^find/, function (next) {
    this.populate({
      path: "category",
    });
    next();
  });

  

const CreatorSample = mongoose.model("CreatorSample", creatorSampleSchema);
module.exports = CreatorSample;
