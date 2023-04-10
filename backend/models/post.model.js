const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    id: { type: String },
    user_id: { type: String },
    content: { type: String, required: true, minlength: 1, maxlength: 300 },
    likes: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", PostSchema);

module.exports = {
  PostModel,
};
