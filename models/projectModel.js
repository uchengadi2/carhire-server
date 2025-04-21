const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the project"],
    },
    
    description: {
      type: String,
      trim: true,
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
    brief: {
        type: String,
        trim: true,
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
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    status:{
      type:String,
      default:"new",
      enum:["new","in-progress","in-review","completed","deleted"]
    },
    type:{
      type:String,
      default:"video",
      enum:["video","audio"]
    },
    briefFile:{
      type:String,
    },
       
   

    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


//QUERY MIDDLEWARE
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brand",
  });
  next();
});


projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "language",
  });
  next();
});



const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
