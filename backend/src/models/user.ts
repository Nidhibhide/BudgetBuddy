import mongoose from "mongoose";

const UserSchmea = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "local",
    },
  },
  {
    timestamps: true,
  } // auto adds createdAt and updatedAt
);

const UserModel = mongoose.model("User", UserSchmea);

export default UserModel;
