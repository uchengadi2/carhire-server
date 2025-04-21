const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the creator"],
    },
    bio:{
      type:String,
      default:null,
    },
    
    user: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
   
      currency: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Currency",
        },
      ],
   
    videoPrice:{
          type:Number,
          default:0
        },
        videoHookPrice:{
          type:Number,
          default:0
        },
        videoDeliveryDays:{
          type:Number,
          default:0
        },
      
        soundPrice:{
          type:Number,
          default:0
        },
        soundHookPrice:{
          type:Number,
          default:0
        },
        soundDeliveryDays:{
          type:Number,
          default:0
        },
       
        
        age:{
          type:Number
        },
        gender:{
          type:String,
          default:"male",
          enum:["male","female","prefer-not-to-say"]
        },
        rate:{
          type:String,
          default:"not-rated",
          enum:["topmost-rated","top-rated","rated","not-rated"]
        },
    
    
         country: [
              {
                type: mongoose.Schema.ObjectId,
                ref: "Country",
              },
            ],
        niches: [
              {
                type: mongoose.Schema.ObjectId,
                ref: "Niche",
              },
            ],
        languages: [
              {
                type: mongoose.Schema.ObjectId,
                ref: "Language",
              },
            ],
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

    
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateModified: {
      type: Date,
     
    },
    image: {
        type: String,
        required: [false, "Please provide the image cover"],
      },
  
      images: [
        {
          type: String,
        },
      ],
      slug:{
        type:String,
        default:null
      },
      status:{
        type:String,
        default:"inactive",
        enum:["active","inactive","suspended","dismissed","deleted"]
      },
      creatorContactPhoneNumber:{
        type:String,
        default:null
      },
      creatorContactEmailAddress:{
        type:String,
        default:null
      },
      bankDetails:{
        type:String,
        default:null
      },
       activatedOrDeactivatedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    dateActivatedOrDeactivated: {
      type: Date,
     
    },
     
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
creatorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});
creatorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

creatorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});

creatorSchema.pre(/^find/, function (next) {
    this.populate({
      path: "niches",
    });
    next();
  });

  creatorSchema.pre(/^find/, function (next) {
    this.populate({
      path: "languages",
    });
    next();
  });

  creatorSchema.pre(/^find/, function (next) {
    this.populate({
      path: "currency",
    });
    next();
  });

  

const Creator = mongoose.model("Creator", creatorSchema);
module.exports = Creator;
