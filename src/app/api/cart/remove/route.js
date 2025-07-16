import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userId, productId, size, color } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: 'userId and productId are required' }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Filter out the item to remove
    cart.items = cart.items.filter(item => {
      const isSameProduct = item.productId.toString() === productId;
      const isSameSize = size ? item.size === size : true;
      const isSameColor = color ? item.color === color : true;
      return !(isSameProduct && isSameSize && isSameColor);
    });

    await cart.save();

    return NextResponse.json({ message: 'Item removed from cart', cart }, { status: 200 });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
