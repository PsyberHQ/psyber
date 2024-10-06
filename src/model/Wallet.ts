import mongoose, { Schema } from 'mongoose';

interface WalletType extends Document {
  address: string;
  type: 'primary' | 'secondary';
  chain: 'ethereum' | 'solana';
  user: mongoose.Types.ObjectId; // Reference to User
}

// Wallet schema
const WalletSchema = new Schema<WalletType>(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['primary', 'secondary'],
      required: true,
    },
    chain: {
      type: String,
      enum: ['ethereum', 'solana'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const WalletModel = mongoose.models.Wallet || mongoose.model<WalletType>('Wallet', WalletSchema);

export { WalletModel };
