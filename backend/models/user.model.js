const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    email: { type: String, required: true },
    bio: { type: String, maxlength: 200 },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
