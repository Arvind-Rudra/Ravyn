import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String }, // only for email login
  role: { type: String, default: "user" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
