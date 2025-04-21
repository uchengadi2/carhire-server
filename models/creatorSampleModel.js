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
    sampleType:{
        type:String,
        enum:["video","audio"]
    },
    
  
    dateCreated: {
      type: Date,
      default: Date.now,
    },
     createdBy: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
        ],

      slug:{
        type:String,
      },  
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
      }

      
   
     
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

  

const CreatorSample = mongoose.model("CreatorSample", creatorSampleSchema);
module.exports = CreatorSample;
