import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    email: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [OrderItemSchema],
    shippingAddress: AddressSchema,
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'placed'
    },
    trackingNumber: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
