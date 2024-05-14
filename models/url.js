const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      required: true,
      type: String,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
        userIP: {
          type: String
        }
      },
    ],
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
