const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, "Please provide the language "],
    },
    
    description: {
      type: String,
      trim: true,
    },
    estimatedSpeakers: {
      type: String,
      default:null
    },  
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
     country: [
                  {
                    type: mongoose.Schema.ObjectId,
                    ref: "Country",
                  },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
languageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

const Language = mongoose.model("Language", languageSchema);
module.exports = Language;
