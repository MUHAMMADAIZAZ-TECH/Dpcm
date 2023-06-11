const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    expense: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FinanceEntry = mongoose.model("FinanceEntry", entrySchema);

module.exports = FinanceEntry;
