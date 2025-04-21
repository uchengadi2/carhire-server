const mongoose = require("mongoose");

const nicheSchema = new mongoose.Schema(
  {
    niche: {
      type: String,
      required: [true, "Please provide the niche "],
    },
    
    description: {
      type: String,
      trim: true,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Niche = mongoose.model("Niche", nicheSchema);
module.exports = Niche;
