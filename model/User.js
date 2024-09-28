import mongoose, { Schema } from "mongoose";
import { type } from "os";
const WalletAddresssSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   primary or secondary
  type: {
    type: String,
    required: true,
  },
  //   ethereum, solana etc
  chain: {
    type: String,
    required: true,
  },
});
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already taken"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  walletAddresses: {
    type: [WalletAddresssSchema],
    required: false,
  },
  level: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

const WalletAddressModel =
  mongoose.models.WalletAddress ||
  mongoose.model("WalletAddress", WalletAddresssSchema);

export { UserModel, WalletAddressModel };
