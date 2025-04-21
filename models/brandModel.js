const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the brand"],
    },
    description:{
      type:String,
      default:null,
    },
    user: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
       country: [
                    {
                      type: mongoose.Schema.ObjectId,
                      ref: "Country",
                    },
                  ],
   
    
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
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
        type:String
      },
      status:{
        type:String,
        default:"active",
        enum:["active","inactive","suspended","dismissed","deleted"]
      },
      brandContactPhoneNumber:{
        type:String,
        default:null
      },
      brandContactEmailAddress:{
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
brandSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

brandSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
    });
    next();
  });

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
