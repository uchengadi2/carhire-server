const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },

    productCurrency: {
      type: String,
    },

    totalDeliveryCost: {
      type: Number,
      default:0,
    },
    totalProductCost: {
      type: Number,
      default:0,
      
    },
    grandTotal: {
      type: Number,
      default:0,
    },
    totalProductCostUk: {
      type: Number,
      default:0,
    },
    totalProductCostUs: {
      type: Number,
      default:0,
    },
    recipientName: {
      type: String,
      default:null
    },
    recipientPhoneNumber: {
      type: String,
      default:null
    },
    recipientEmailAddress: {
      type: String,
      default:null
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      enum: ["to-be-confirmed", "paid", "not-processed"],
      default: "to-be-confirmed",
    },
    paymentMethod: {
      type: String,
      default: "audit",
      enum: ["audit", "card", "foreigner"],
    },
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "unprocessed",
        "pocessed",
        "rejected",
        "fullfilled",
      ],
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },  
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
