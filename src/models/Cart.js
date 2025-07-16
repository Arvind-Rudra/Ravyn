import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String, // optional – for quick display
    image: String, // optional
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    size: String, // optional for clothing
    color: String // optional for clothing
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // one cart per user
    },
    items: [CartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
