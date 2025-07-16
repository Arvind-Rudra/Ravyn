import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['clothing', 'skincare', 'accessories'],
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
      default: 'Ravyn',
    },
    description: {
      type: String,
    },
    features: [
      {
        type: String,
      },
    ],
    ingredients: [
      {
        type: String,
      },
    ], // skincare only

    sizes: [
      {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    ], // clothing only

    colors: [
      {
        type: String,
      },
    ], // clothing/accessories

    skinType: [
      {
        type: String,
        enum: ['dry', 'oily', 'combination', 'normal', 'sensitive'],
      },
    ], // skincare only

    gender: {
      type: String,
      default: 'women',
    },

    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // in percentage
    },
    finalPrice: {
      type: Number,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],

    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    isTrending: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },

    style: {
      type: String,
    }, // optional, for clothing/accessories
    season: [
      {
        type: String,
        enum: ['summer', 'winter', 'monsoon', 'spring', 'fall','all'],
      },
    ],
    occasion: [
      {
        type: String,
        enum: ['casual', 'party', 'formal', 'gym', 'beach','daily'],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-calculate final price before saving
ProductSchema.pre('save', function (next) {
  if (this.discount && this.price) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.finalPrice = this.price;
  }
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
