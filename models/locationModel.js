const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the state"],
    },
    code: {
      type: String,
      required: [false, "Please provide the state code"],
    },
    description: {
      type: String,
      trim: true,
    },
    locationType: {
      type: String,
      default: "local-airport",
      enum: [
        "local-airport",
        "international-airport",
        "private-airfield",
        "cargo-airport",
        "military-airport",
        "heliport",
        ,
      ],
    },

    country: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    state: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "State",
      },
    ],
    city: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "City",
      },
    ],
    address: {
      type: String,
    },
    town: {
      type: String,
    },

    contactPerson: {
      type: String,
    },
    contactPersonEmail: {
      type: String,
    },
    contactPhoneNumber: {
      type: String,
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
    vvipPackageCost: {
      type: Number,
    },
    businessExecutivePackageCost: {
      type: Number,
    },
    diplomaticPackageCost: {
      type: Number,
    },
    familyPackageCost: {
      type: Number,
    },
    privateJetPackageCost: {
      type: Number,
    },
    medicalEmergencyPackageCost: {
      type: Number,
    },
    airlineCrewPackageCost: {
      type: Number,
    },
    addonLuxuryServiceCost: {
      type: Number,
    },
    addonOnsiteSecurityServiceCost: {
      type: Number,
    },
    addonOntransitSecurityServiceCost: {
      type: Number,
    },
    addonLoungeAccessServiceCost: {
      type: Number,
    },
    addonConciergeServiceCost: {
      type: Number,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    dataOfLastStatusChange: {
      type: Date,
      default: Date.now,
    },
    statusChangedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],


  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
locationSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: "country",
  //   });
  //   this.populate({
  //     path: "state",
  //   });
  this.populate({
    path: "city",
  });
  this.populate({
    path: "createdBy",
  });
  next();
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
