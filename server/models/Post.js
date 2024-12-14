const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    // author: { type: String, required: true },

  },
  { timestamps: true }
);
// console.log("Post model initialized", PostSchema);

module.exports = mongoose.model("Post", PostSchema);
