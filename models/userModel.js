import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      trim: true,
      maxlength: 25,
      unique: [true, "Username already exists"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Email already exists"],
      maxlength: 30,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
    },
    mobile: {
      type: Number,
      maxlength: 20,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    goal: {
      type: String,
      maxlength: 200,
    },
    links: [String],
    birthdate: {
      type: Date,
    },

    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto

    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpiration = Date.now() + 10 * 60 * 1000;
  console.log(resetToken);
  return resetToken;
};
export default mongoose.models.User || mongoose.model("User", userSchema);
