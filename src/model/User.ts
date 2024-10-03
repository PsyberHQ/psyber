import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  imageUrl?: string;
  createdAt: Date;
  level: number;
  xp: number;
  badge?: string;
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    level: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { UserModel };
