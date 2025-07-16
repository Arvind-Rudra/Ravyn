import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase();
    const {
      userId,
      productId,
      name,
      image,
      price,
      quantity,
      size,
      color
    } = await req.json();

    if (!userId || !productId || !price || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart (same product + variant)
    const existingItemIndex = cart.items.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      // If it exists, increase quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        name,
        image,
        price,
        quantity,
        size,
        color
      });
    }

    await cart.save();

    return NextResponse.json({ message: 'Item added to cart', cart }, { status: 200 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
