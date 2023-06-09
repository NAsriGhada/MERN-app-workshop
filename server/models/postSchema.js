const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userCollection",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postCollection", postSchema);
